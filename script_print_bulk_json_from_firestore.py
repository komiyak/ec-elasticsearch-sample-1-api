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

    db = firestore.Client(credentials=credentials)
    products_ref = db.collection('products')
    for doc in products_ref.stream():
        print('{} => {}'.format(doc.id, doc.to_dict()))


if __name__ == '__main__':
    main()
