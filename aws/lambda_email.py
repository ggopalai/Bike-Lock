import boto3
import json

# Create an SES client for the 'us-west-1' region
ses = boto3.client('ses', region_name='us-west-1')

# Function to send an email using SES
def send_mail(subject, message, recipient):
    # Define email parameters
    email_params = {
        'Destination': {
            'ToAddresses': [recipient],
        },
        'Message': {
            'Body': {
                'Text': {'Data': message},
            },
            'Subject': {'Data': subject},
        },
        'Source': 'stopthestealucsd@gmail.com',
    }

    try:
        # Send email using the SES client
        response = ses.send_email(**email_params)
        print("MAIL SENT SUCCESSFULLY!!")
    except Exception as e:
        # Handle errors if any occur during the email sending process
        print("FAILURE IN SENDING MAIL!!", e)
        raise e

# Lambda function handler
def handler(event, context):
    # Get values for the subject, message, recipient, and GPS coordinates from the input event
    subject = event['subject']
    message = event['message']
    recipient = event['recipient']
    lat = event['gps_lat']
    lon = event['gps_long']

    # Add the GPS coordinates to the message
    message = f'{message} \n The bike is currently at Latitude {lat} and Longitude {lon}'

    # Send the email
    send_mail(subject, message, recipient)

    # Return a response indicating that the email was sent successfully
    return {
        'statusCode': 200,
        'body': json.dumps('Email sent successfully!')
    }
