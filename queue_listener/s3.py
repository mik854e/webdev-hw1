import boto
import boto.s3
import StringIO
import os

BASE_PATH = 's3'
MEDIA_PATH = 's3/media'
loc_path = '/s3/media'
BUCKET_NAME = 'commerce-bucket'

conn = boto.connect_s3(
        aws_access_key_id='AKIAJHHMPPTOXDP7VWSA',
        aws_secret_access_key='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'
        )

conn.create_bucket('commerce-bucket')

my_bucket =  conn.get_bucket(BUCKET_NAME)

def list_all_buckets():
	for bucket in conn.get_all_buckets():
	        print "{name}\t{created}".format(
	                name = bucket.name,
	                created = bucket.creation_date,
	        )

def list_bucket_content():
	for key in my_bucket.list():
	        print "{name}\t{size}\t{modified}".format(
	                name = key.name,
	                size = key.size,
	                modified = key.last_modified,
	        )

def upload_image(img):
	from boto.s3.key import Key
	full_key_name = os.path.join(MEDIA_PATH, img)
	file_path = os.path.join(MEDIA_PATH, img)
	# print(full_key_name)
	print(file_path)
	k = Key(my_bucket)
	k.name = full_key_name
	k.set_metadata("Content-Type", 'images/jpeg')
	k.set_contents_from_filename(file_path)


def upload_file(file_name, directory=''):
	from boto.s3.key import Key
	full_key_name = os.path.join(PATH, directory, file_name)
	print(full_key_name)
	k = Key(my_bucket)
	k.set_contents_from_filename(StringIO(full_key_name))

def get_file_url(file_name):
	from boto.s3.key import Key
	full_key_name = os.path.join(MEDIA_PATH, img)
	k = Key(my_bucket)
	key = my_bucket.get_key(full_key_name)
	url = key.generate_url(0, query_auth=False, force_http=True)
	return url 

def delete_file(file_name, directory=MEDIA_PATH ):
	from boto.s3.key import Key
	full_key_name = os.path.join(directory, img)
	k = Key(my_bucket)
	key = my_bucket.get_key(full_key_name)
	bucket.delete_key(key)

upload_image('hoodie.jpeg')
