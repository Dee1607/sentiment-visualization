import re
import tweepy
from tweepy import OAuthHandler
from textblob import TextBlob
import random
import json

# Tweeter Client class to extract tweet data for word Cloud
class TwitterClient(object):

    # initial function to store authentication details to login tweeter developer account
    def __init__(self):

        # Tweeter Authentication details
        consumer_key = 'IvPwHxzETcz6VlujX842mNrel'
        consumer_secret = 'hNF83pMPQ6CTuOiBKriCHKlBLQmJurb8a8KJGWW88ZqQlSsYn0'
        access_token = '1358746918994681860-oIlbFumKwyCrJr2DGxuu2pd3kz6K5W'
        access_token_secret = '77hciGvnhlVW6leK4VWfgkOSL8ZQE24F9AUFQevkpXzlN'

        try:
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            self.auth.set_access_token(access_token, access_token_secret)
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")

    # remove URL from the tweet text data
    def removeUrl(self, string):
        string = str(string)
        string = re.sub(r'RT ', '', string, flags=re.MULTILINE)
        string = re.sub(
            r'https?:\/\/ (www\.)?[-a-zA-Z0–9 @:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#?&//=]*)', "",
            string,
            flags=re.MULTILINE)
        string = re.sub(r'[-a-zA-Z0–9 @:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0–9@:%_\+.~#?&//=]*)', "", string,
                        flags=re.MULTILINE)
        return string

    # removing noise such as mentions, hashtags and tags
    def removeNoiseWords(self, string):
        string = str(string)
        string = ' '.join(re.sub("(@[A-Za-z0–9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", string).split())
        return string

    # removing numbers
    def removeNumbers(self, string):
        string = str(string)
        string = re.sub(r"\d", "", string)
        return string

    # Function to get the sentiment of the tweet data
    def get_tweet_sentiment(self, tweet):
        # create TextBlob object of passed tweet text
        analysis = TextBlob(self.removeNumbers(self.removeUrl(self.removeNoiseWords(tweet))))
        # set sentiment
        print(analysis.sentiment.polarity)
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'

    # Getting tweets
    def get_tweets(self, query):
        # list to store tweets
        tweets = []

        # fetch tweets
        fetched_tweets = self.api.search_tweets(q=query, lang='en', count=1000)
        for tweet in fetched_tweets:
            parsed_tweet = {}
            parsed_tweet['text'] = tweet.text
            parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)
            parsed_tweet['location'] = tweet.user.location

            if tweet.retweet_count > 0:
                if parsed_tweet not in tweets:
                    tweets.append(parsed_tweet)
            else:
                tweets.append(parsed_tweet)

        # return tweets
        return tweets

    # Get the frequency of the data
    def freq(str):

        # break the string into list of words
        str = str.split()
        str2 = []

        # loop till string values present in list str
        for i in str:
            # checking for the duplicacy
            if i not in str2:
                # insert value in str2
                str2.append(i)

        for i in range(0, len(str2)):
            # count the frequency of each word(present
            # in str2) in str and print
            print('Frequency of', str2[i], 'is :', str.count(str2[i]))

# # main function which will be called first while running this program
# It create the client connection, fetch tweets, clean and process tweets 
# and at the end store the,m in a perticular json format.
def main():
    api = TwitterClient()
    tweets = api.get_tweets(query='ukraine ukrain')
    country_list = ['Ontario', 'Nova Scotia', 'Alberta', 'New Brunswick', 'British Columbia', 'Manitoba', 'Nunavut',
                    'Newfoundland and Labrador', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon', 'Northwest Territories']
    for tweet in tweets:
        tweet['location'] = random.choice(country_list)

    pieChart = []

    for loc in country_list:
        operable_tweets = []
        new = {}
        neutral = 0
        positive = 0
        negative = 0
        for tweet in tweets:
            if tweet['location'] == loc:
                if tweet['sentiment'] == 'neutral':
                    neutral = neutral + 1
                if tweet['sentiment'] == 'positive':
                    positive = positive + 1
                if tweet['sentiment'] == 'negative':
                    negative = negative + 1
        total = negative + positive + neutral
        try:
            negative = negative / total
        except ZeroDivisionError:
            negative = 0
        try:
            positive = positive / total
        except ZeroDivisionError:
            positive = 0
        try:
            neutral = neutral / total
        except ZeroDivisionError:
            neutral = 0

        new['Percentage'] = round(negative, 2)
        new['type'] = "negative"
        new['location'] = loc
        pieChart.append(new)
        new = {}
        new['Percentage'] = round(positive, 2)
        new['type'] = "positive"
        new['location'] = loc
        pieChart.append(new)
        new = {}
        new['Percentage'] = round(neutral, 2)
        new['type'] = "netural"
        new['location'] = loc
        pieChart.append(new)

    pieChart = json.dumps(pieChart)
    with open("UkrainePieChart.json", "w") as outfile:
        outfile.write(pieChart)


if __name__ == "__main__":
    # calling main
    main()