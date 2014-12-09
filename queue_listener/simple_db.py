import boto.sdb
from flask import Flask, jsonify, redirect, request, url_for

app = Flask(__name__)

conn = boto.sdb.connect_to_region("us-east-1",
                                  aws_access_key_id='AKIAJHHMPPTOXDP7VWSA',
                                  aws_secret_access_key='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')

conn.create_domain('test-domain')

domains = conn.get_all_domains()

commerce_dom = conn.get_domain('test-domain')


domain_meta = conn.domain_metadata(commerce_dom)
print domain_meta.item_count

ITEMS = {
    'TS-1000-W-S': {
        'name': 'T-Shirt',
        'desc': 'A cotton crew neck T-shirt',
        'size': 'Small',
        'color': 'White',
        'quantity': '0',
        'aws': ''},
    'TS-1000-W-M': {
        'name': 'T-Shirt',
        'desc': 'A cotton crew neck T-shirt',
        'size': 'Medium',
        'color': 'White',
        'quantity': '5',
        'aws': ''},
    'TS-1000-B-L': {
        'name': 'T-Shirt',
        'desc': 'A cotton crew neck T-shirt',
        'size': 'Large',
        'color': 'Blue',
        'quantity': '0',
        'aws': ''},
    'TS-1000-R-S': {
        'name': 'T-Shirt',
        'desc': 'A cotton crew neck T-shirt',
        'size': 'Small',
        'color': 'Red',
        'quantity': '0',
        'aws': ''},
    'TS-1000-W-M': {
        'name': 'T-Shirt',
        'desc': 'A cotton crew neck T-shirt',
        'size': 'Medium',
        'color': 'Red',
        'quantity': '2',
        'aws': ''},
    'PT-1000-W-S': {
        'name': 'Pants',
        'desc': 'A cotton crew neck T-shirt',
        'size': 'Small',
        'color': 'White',
        'quantity': '0',
        'aws': ''},
    'PT-1000-W-M': {
        'name': 'Pants',
        'desc': 'Blue jeans',
        'size': 'Medium',
        'color': 'White',
        'quantity': '0',
        'aws': ''},
    'PT-1000-W-L': {
        'name': 'Pants',
        'desc': 'Blue jeans',
        'size': 'Large',
        'color': 'White',
        'quantity': '0',
        'aws': ''},
    'HD-1000-W-S': {
        'name': 'Hoodie',
        'desc': 'A slim-fit Hoodie',
        'size': 'Small',
        'color': 'White',
        'quantity': '4',
        'aws': ''}
}
shopping_cart = {}  # {SKU: quantity, SKU: quantity}


def add_to_cart_by_SKU(SKU, quantity_to_add):
    if ITEMS[SKU]['quantity'] >= quantity_to_add:
        if SKU in shopping_cart:
            shopping_cart['SKU'] = shopping_cart['SKU'] + quantity_to_add
        else:
            shopping_cart['SKU'] = quantity_to_add
        ITEMS[SKU]['quantity'] = ITEMS[SKU]['quantity'] - quantity_to_add


def remove_from_cart_by_SKU(SKU, quantity_to_remove):
    if SKU in shopping_cart:
        if shopping_cart[SKU] == quantity_to_remove:
            del shopping_cart[SKU]
        else:
            shopping_cart['SKU'] = shopping_cart['SKU'] - quantity_to_remove
        ITEMS[SKU]['quantity'] = ITEMS[SKU]['quantity'] + quantity_to_remove


@app.route('/entries/<name>')
def get_entry(name):
    item = commerce_dom.get_item(name)
    return jsonify(item=item)


@app.route('/entries')
def get_entries():
    search_args = request.args
    query = "select * from `test-domain`"
    rs = commerce_dom.select(query)
    entries = []
    for entry in rs:
        not_matching = False
        for arg in search_args:
            if entry[arg] != search_args[arg]:
                not_matching = True
            if not_matching:
                continue
        if not_matching:
            continue
        entries += [{entry['name']: entry}]
    return jsonify(items=entries)


@app.route('/entries/add', methods=['POST'])
def add_entry():
    entry_details = request.form
    commerce_dom.put_attributes(entry_details['name'], entry_details)
    return redirect(url_for('get_entries'))


@app.route('/entries/update', methods=['POST'])
def update_entry():
    entry_details = request.form
    item = commerce_dom.get_item(entry_details['name'])
    for attr, value in entry_details.viewitems():
        item[attr] = value
    item.save()
    return redirect(url_for('get_entries'))


@app.route('/entries/delete', methods=['POST'])
def delete_entry():
    entry_details = request.form
    commerce_dom.delete_item(commerce_dom.get_item(entry_details['name']))
    return redirect(url_for('get_entries'))


def how_many(SKU=None, name=None, desc=None, size=None, color=None,
             quantity=None):  # how many red items with quanity 3 = (null, )
    count = 0
    entries = get_entries(SKU, name, desc, size, color, quantity)
    for entry in entries:
        count = count + entries[entry]['quantity']


def remove_from_cart(SKU=None, name=None, desc=None, size=None, color=None,
                     quantity=None,
                     quantity_to_remove=0):  # how many red items with quanity 3 = (null, )
    entries = get_entries(SKU, name, desc, size, color, quantity)
    for entry in entries:
        remove_from_cart_by_SKU(ITEMS[entry]['SKU'], quantity_to_remove)


def add_to_cart(SKU=None, name=None, desc=None, size=None, color=None,
                quantity=None,
                quantity_to_add=0):  # how many red items with quanity 3 = (null, )
    entries = get_entries(SKU, name, desc, size, color, quantity)
    for entry in entries:
        add_to_cart_by_SKU(ITEMS[entry]['SKU'], quantity_to_add)


if __name__ == '__main__':
    app.run(debug=True)