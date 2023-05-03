import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    
    # Create an SES client for the 'us-west-1' region
    ses_client = boto3.client('sesv2', region_name='us-west-1')
    
    # Validate input
    if 'email_identity' not in event or not event['email_identity']:
        return {
            'statusCode': 400,
            'body': 'Email identity is missing or empty'
        }
    
    # Define the email identity to be created
    email_identity = event['email_identity']

    # Create the email identity
    email_identity_exists = False
    try: 
        ses_client.create_email_identity(EmailIdentity=email_identity)
    except ClientError as e:
        error_code = e.response['Error']['Code']
        if error_code == 'AlreadyExistsException':
            email_identity_exists = True
        else:
            print(f'An error occurred: {error_code}')
            return {
                'statusCode': 500,
                'body': 'Internal Server Error'
            }
    
    # Return the response
    if email_identity_exists:
        return {
            'statusCode': 400,
            'body': 'Email identity already exists'
        }
    else:
        return {
            'statusCode': 200,
            'body': 'Email identity created successfully'
        }
