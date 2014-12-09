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
			'quantity': '5'
			'aws': '' },
		'TS-1000-B-L': {
			'name' : 'T-Shirt',
			'desc:': 'A cotton crew neck T-shirt',
			'size:': 'Large',
			'color': 'Blue',
			'quantity': '0'
			'aws': '' },
		'TS-1000-R-S': {
			'name' : 'T-Shirt',
			'desc:': 'A cotton crew neck T-shirt',
			'size:': 'Small',
			'color': 'Red',
			'quantity': '0',
			'aws': '' }
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
