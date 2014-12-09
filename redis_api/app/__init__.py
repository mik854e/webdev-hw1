from flask import Flask, jsonify
import redis

app = Flask(__name__)

r = redis.StrictRedis(host='localhost', port=6379, db=0)


@app.route('/sessions/<session_id>')
def get_sessions(session_id):
    result = r.hgetall(session_id)
    return jsonify(result)


@app.route('/sessions/<session_id>/new')
def new_session(session_id):
    r.hmset(session_id, {'products_seen': session_id + '_products_seen',
                         'categories_seen': session_id + '_categories_seen'})
    return 'created session'


@app.route('/sessions/<session_id>/products/<category>/<product_id>')
def add_product(session_id, category, product_id):
    r.hincrby(session_id, product_id)
    r.hincrby(session_id, category)

    r.sadd(r.hget(session_id, 'products_seen'), product_id)
    r.sadd(r.hget(session_id, 'categories_seen'), category)
    return 'increased count of product'


@app.route('/sessions/<session_id>/delete')
def delete_session(session_id):
    r.delete(session_id)
    return 'deleted session'


@app.route('/sessions/<session_id>/categories_seen')
def get_categories_seen_for_session(session_id):
    result = r.smembers(session_id + '_categories_seen')
    result = list(result)
    return jsonify(items=result)


@app.route('/sessions/<session_id>/products_seen')
def get_products_seen_for_session(session_id):
    result = r.smembers(session_id + '_products_seen')
    result = list(result)
    return jsonify(items=result)