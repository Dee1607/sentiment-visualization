import re
import tweepy
from tweepy import OAuthHandler
from textblob import TextBlob


class TwitterClient(object):

    def __init__(self):
        # Tweeter Authentication details
        consumer_key = 'IvPwHxzETcz6VlujX842mNrel'
        consumer_secret = 'hNF83pMPQ6CTuOiBKriCHKlBLQmJurb8a8KJGWW88ZqQlSsYn0'
        access_token = '1358746918994681860-oIlbFumKwyCrJr2DGxuu2pd3kz6K5W'
        access_token_secret = '77hciGvnhlVW6leK4VWfgkOSL8ZQE24F9AUFQevkpXzlN'

        # attempt authentication
        try:
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            self.auth.set_access_token(access_token, access_token_secret)
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")

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

    def get_tweet_sentiment(self, tweet):
        # create TextBlob object of passed tweet text
        analysis = TextBlob(self.removeNumbers(self.removeUrl(self.removeNoiseWords(tweet))))
        # set sentiment
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'

    def get_tweets(self, query, count=10000):
        # list to store tweets
        tweets = []

        try:
            # fetch tweets
            fetched_tweets = self.api.search_tweets(q=query, count=count)

            for tweet in fetched_tweets:
                parsed_tweet = {}

                parsed_tweet['text'] = tweet.text
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)

                if tweet.retweet_count > 0:
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)

            # return tweets
            return tweets

        except tweepy.TweepError as e:
            print("Error : " + str(e))


def main():
    api = TwitterClient()
    tweets = api.get_tweets(query='Ukrain', count=20000)

    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
    print("Positive tweets percentage: {} %".format(100 * len(ptweets) / len(tweets)))
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
    print("Negative tweets percentage: {} %".format(100 * len(ntweets) / len(tweets)))
    print("Neutral tweets percentage: {} % \
        ".format(100 * (len(tweets) - (len(ntweets) + len(ptweets))) / len(tweets)))

    print("\n\nPositive tweets:")
    for tweet in ptweets[:1000]:
        print(tweet['text'])

    print("\n\nNegative tweets:")
    for tweet in ntweets[:1000]:
        print(tweet['text'])


if __name__ == "__main__":
    # calling main function
    main()
