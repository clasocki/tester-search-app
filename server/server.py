from flask import Flask, request
from flask_cors import CORS
import sqlite3
import json

app = Flask(__name__)

CORS(app)

def dict_factory(cursor, row):
    def underscore_to_camelcase(value):
        def camelcase(): 
            yield str.lower
            while True:
                yield str.capitalize

        c = camelcase()
        return "".join(next(c)(x) for x in value.split("_"))

    d = {}
    for idx, col in enumerate(cursor.description):
        d[underscore_to_camelcase(col[0])] = row[idx]
    return d

def connect_to_db():
    conn = sqlite3.connect('testers.db')
    conn.row_factory = dict_factory

    return conn

def connect_and_fetch(query, column):
    conn = connect_to_db()
    c = conn.cursor()
    results = c.execute(query).fetchall()

    conn.close()

    return json.dumps(list(map(lambda r: r[column], results)))

@app.route('/countries')
def get_countries():
    return connect_and_fetch('select distinct(country) from testers', 'country')

@app.route('/devices')
def get_devices():
    return connect_and_fetch('select description from devices', 'description')

@app.route('/testers')
def search_testers():
    query = request.args.get('search')
    query_dict = json.loads(query)
    device_filter = ''
    filters = []

    def get_string_field_list(values):
        return ",".join([ f"'{x}'" for x in values])

    if 'countries' in query_dict and query_dict['countries']:
        filters.append(f'tester_id in (select t.tester_id from testers t where country in ({get_string_field_list(query_dict["countries"])}))')
    if 'devices' in query_dict and query_dict['devices']:
        filters.append(f'device_id in (select device_id from devices d where d.description in ({get_string_field_list(query_dict["devices"])}))')
    tester_devices = f'(select * from tester_device where {" and ".join(filters)}) td' if filters else 'tester_device td'
    
    query = f'''select t.*, SUM(CASE WHEN b.bug_id IS NOT NULL THEN 1 ELSE 0 END) experience 
                from testers t inner join {tester_devices} on t.tester_id == td.tester_id 
                left join bugs b on td.tester_id == b.tester_id and td.device_id = b.device_id
                group by t.tester_id'''

    conn = connect_to_db()
    c = conn.cursor()
    results = c.execute(query).fetchall()

    conn.close()
    
    return json.dumps(results)

if __name__ == '__main__':
    app.run()