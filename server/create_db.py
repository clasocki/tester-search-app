import sqlite3
import csv

def create_db():
    conn = sqlite3.connect('testers.db')
    conn.set_trace_callback(print)
    c = conn.cursor()
    c.execute('''CREATE TABLE testers
                (tester_id INTEGER PRIMARY KEY, first_name TEXT, 
                last_name TEXT, country TEXT, last_login DATE)''')

    c.execute('''CREATE TABLE tester_device
                (tester_id INTEGER, device_id INTEGER, PRIMARY KEY(tester_id, device_id))''')

    c.execute('''CREATE TABLE devices
                (device_id INTEGER PRIMARY KEY, description TEXT)''')

    c.execute('''CREATE TABLE bugs
                (bug_id INTEGER PRIMARY KEY, device_id INTEGER, tester_id INTEGER)''')

    def insert_into_db(dataset_name):
        with open(f'data/{dataset_name}.csv') as f:
            reader = csv.reader(f, delimiter=',')
            for idx, row in enumerate(reader):
                if idx > 0:
                    c.execute(f'INSERT INTO {dataset_name} VALUES ({",".join(["?"] * len(row))});', row)

    insert_into_db('testers')
    insert_into_db('bugs')
    insert_into_db('tester_device')
    insert_into_db('devices')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_db()