"""To print json objects for Bulk API in Elasticsearch.

The json objects are from the Firestore storage."""

import argparse
from google.oauth2 import service_account
from google.cloud import firestore


def main():
    parser = argparse.ArgumentParser(description='To print json objects for Bulk API in Elasticsearch. The json objects are from the Firestore storage.')
    parser.add_argument('credentials_file', help='A service account private key file on Google Cloud.')
    args = parser.parse_args()

    # A servicer account to access Firestore.
    credentials = service_account.Credentials.from_service_account_file(args.credentials_file)

    index_collection = []

    db = firestore.Client(credentials=credentials)
    products_ref = db.collection('products')
    for doc in products_ref.stream():
        doc_dict = doc.to_dict()
        fields = {}
        fields['name'] = doc_dict['name']
        fields['price'] = doc_dict['price']
        fields['thumbnail_url'] = doc_dict['thumbnailUrl']
        fields['description'] = ''
        index_collection.append({'id': doc.id, 'fields': fields})

    # Formatting to print for Elasticsearch indexing.
    for i in index_collection:
        print('{"create": {"_id": "%s"}}' % i['id'])
        print('{"name": "%s", "price": %d, "thumbnail_url": "%s", "description": "%s"}' % (i['fields']['name'], i['fields']['price'], i['fields']['thumbnail_url'], i['fields']['description']))


if __name__ == '__main__':
    main()
