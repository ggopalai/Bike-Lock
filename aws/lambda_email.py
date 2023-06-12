import boto3
import json

# Create an SES client for the 'us-west-1' region
ses = boto3.client('ses', region_name='us-west-1')

# Function to send an email using SES
def send_mail(subject, message, recipient, photo_data, latitude, longitude):
    # Define email parameters
    email_params = {
        'Destination': {
            'ToAddresses': [recipient],
        },
        'Message': {
            'Body': {
                'Html': {
                    'Data': f'<html><body><h1>{subject}</h1><p>{message}</p><p>Latitude: {latitude}</p><p>Longitude: {longitude}</p><img src="{photo_data}"></body></html>'
                }
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
    # Get values for the subject, message, recipient, GPS coordinates, and photo data from the input event
    subject = event['subject']
    message = event['message']
    recipient = event['recipient']
    latitude = event['gps_lat']
    longitude = event['gps_long']
    photo_data = event['photoData']
    print(photo_data)

    # Add the GPS coordinates to the message
    message = f'{message} \n The bike is currently at Latitude {latitude} and Longitude {longitude}'

    # Send the email with the photo and coordinates embedded
    send_mail(subject, message, recipient, photo_data, latitude, longitude)

    # Define the response headers
    headers = {
        'Access-Control-Allow-Origin': 'https://ggopalai.github.io',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
    }

    # Return a response indicating that the email was sent successfully, along with the headers
    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps('Email sent successfully!')
    }