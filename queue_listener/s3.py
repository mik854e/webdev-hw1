import boto
import boto.s3
from flask import Flask, jsonify, redirect, request, url_for
import os

app = Flask(__name__)

BASE_PATH = 's3'
MEDIA_PATH = 'media'
BUCKET_NAME = 'commerce-bucket'

conn = boto.connect_s3(
    aws_access_key_id='AKIAJHHMPPTOXDP7VWSA',
    aws_secret_access_key='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'
)

conn.create_bucket('commerce-bucket')

my_bucket = conn.get_bucket(BUCKET_NAME)


# @app.route('/buckets')
# def list_all_buckets():
#     for bucket in conn.get_all_buckets():
#         print "{name}\t{created}".format(
#             name=bucket.name,
#             created=bucket.creation_date,
#         )
#
#
# def list_bucket_content():
#     for key in my_bucket.list():
#         print "{name}\t{size}\t{modified}".format(
#             name=key.name,
#             size=key.size,
#             modified=key.last_modified,
#         )

@app.route('/images/upload', methods=['POST'])
def upload_image():
    from boto.s3.key import Key

    img = request.form['filename']
    directory = request.form['directory']

    full_key_name = os.path.join(directory, img)
    file_path = os.path.join(MEDIA_PATH, img)
    # print(full_key_name)
    print(file_path)
    k = Key(my_bucket)
    k.name = full_key_name
    k.set_metadata("Content-Type", 'images/jpeg')
    k.set_contents_from_filename(file_path)
    return 'success'

@app.route('/files/upload', methods=['POST'])
def upload_file():
    from boto.s3.key import Key

    file_name = request.form['filename']
    directory = request.form['directory']
    full_key_name = os.path.join(directory, file_name)
    print(full_key_name)
    k = Key(my_bucket)
    k.set_contents_from_filename(full_key_name)
    return 'success'


# @app.route('/files/<filename>')
# def get_file_url(filename):
#     full_key_name = os.path.join(MEDIA_PATH, filename)
#     key = my_bucket.get_key(full_key_name)
#     url = key.generate_url(0, query_auth=False, force_http=True)
#     return url


@app.route('/files/delete', methods=['POST'])
def delete_file():
    filename = request.form['filename']
    directory = request.form['directory']
    full_key_name = os.path.join(directory, filename)
    key = my_bucket.get_key(full_key_name)
    my_bucket.delete_key(key)
    return 'success'


if __name__ == '__main__':
    app.run(debug=True)
