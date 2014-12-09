import boto.sdb


conn = boto.sdb.connect_to_region("us-east-1",
                                  aws_access_key_id='AKIAJHHMPPTOXDP7VWSA',
                                  aws_secret_access_key='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')

conn.create_domain('test-domain')

domains = conn.get_all_domains()

commerce_dom = conn.get_domain('test-domain')

print commerce_dom

item_name = 'ABC_123'
item_attrs = {'Artist': 'The Jackson 5', 'Genera':'Pop'}
print commerce_dom.put_attributes(item_name, item_attrs)

domain_meta = conn.domain_metadata(commerce_dom)
print domain_meta.item_count

ITEMS = {
		'TS-1000-W-S': {
			'name' : 'T-Shirt',
			'desc:': 'A cotton crew neck T-shirt',
			'size:': 'Small',
			'color': 'White',
			'quantity': '0',
			'aws': '' },
		'TS-1000-W-M': {
			'name' : 'T-Shirt',
			'desc:': 'A cotton crew neck T-shirt',
			'size:': 'Medium',
			'color': 'White',
			'quantity': '5',
			'aws': '' },
		'TS-1000-B-L': {
			'name' : 'T-Shirt',
			'desc:': 'A cotton crew neck T-shirt',
			'size:': 'Large',
			'color': 'Blue',
			'quantity': '0',
			'aws': '' },
		'TS-1000-R-S': {
			'name' : 'T-Shirt',
			'desc:': 'A cotton crew neck T-shirt',
			'size:': 'Small',
			'color': 'Red',
			'quantity': '0',
			'aws': '' },
		'TS-1000-W-M': {
			'name' : 'T-Shirt',
			'desc:': 'A cotton crew neck T-shirt',
			'size:': 'Medium',
			'color': 'Red',
			'quantity': '2',
			'aws': '' },
		'PT-1000-W-S': {
			'name' : 'Pants',
			'desc:': 'A cotton crew neck T-shirt',
			'size:': 'Small',
			'color': 'White',
			'quantity': '0',
			'aws': '' },
		'PT-1000-W-M': {
			'name' : 'Pants',
			'desc:': 'Blue jeans',
			'size:': 'Medium',
			'color': 'White',
			'quantity': '0',
			'aws': '' },
		'PT-1000-W-L': {
			'name' : 'Pants',
			'desc:': 'Blue jeans',
			'size:': 'Large',
			'color': 'White',
			'quantity': '0',
			'aws': '' },
		'HD-1000-W-S': {
			'name' : 'Hoodie',
			'desc:': 'A slim-fit Hoodie',
			'size:': 'Small',
			'color': 'White',
			'quantity': '4',
			'aws': '' }
}
shopping_cart = {} # {SKU: quantity, SKU: quantity}

def add_to_cart(SKU, quantity_to_add):
	if item[SKU]['quantity'] >= quantity_to_add:
		if SKU in shopping_cart:
			shopping_cart['SKU'] = shopping_cart['SKU'] + quantity_to_add
		else:
			shopping_cart['SKU'] = quantity_to_add
		item[SKU]['quantity'] = item[SKU]['quantity'] - quantity_to_add

def remove_from_cart(SKU, quantity_to_remove):
	if SKU in shopping_cart:
		if shopping_cart[SKU] == quantity_to_remove:
			del shopping_cart[SKU]
		else:
			shopping_cart['SKU'] = shopping_cart['SKU'] - quantity_to_remove
		item[SKU]['quantity'] = item[SKU]['quantity'] + quantity_to_remove

def getEntries(SKU = None, name = None, desc = None , size = None , color = None , quantity = None): #how many red items with quanity 3 = (null, )
	entries = []
	for entry in ITEMS:
		if not SKU or ITEMS[entry] == SKU:
			if not name or ITEMS[entry]['name'] == name:
				if not desc or ITEMS[entry]['desc'] == desc:
					if not size or ITEMS[entry]['size'] == size:
						if not color or ITEMS[entry]['color'] == color:
							if not quantity or ITEMS[entry]['quantity'] == quantity: 
								entries = entries + ITEMS[entry]
	return entries

def how_many(SKU = None, name = None, desc = None , size = None , color = None , quantity = None): #how many red items with quanity 3 = (null, )
	count = 0
	entries = getSKUS(SKU, name, desc, size, color, quantity)
	for entry in entries:
		count = count + entries[entry]['quantity']

def remove_from_cart(SKU = None, name = None, desc = None , size = None , color = None , quantity = None, quantity_to_remove = 0): #how many red items with quanity 3 = (null, )
	entries = getSKUS(SKU, name, desc, size, color, quantity)
	for entry in entries:
		remove_from_cart(ITEMS[entry]['SKU'], quantity_to_remove)
def add_to_cart(SKU = None, name = None, desc = None , size = None , color = None , quantity = None, quantity_to_add = 0): #how many red items with quanity 3 = (null, )
	entries = getSKUS(SKU, name, desc, size, color, quantity)
	for entry in entries:
		add_to_cart(ITEMS[entry]['SKU'], quantity_to_add)

