import re
import tweepy
from nltk.corpus import stopwords
from tweepy import OAuthHandler
from textblob import TextBlob
import random
import json
from heapq import nlargest


class TwitterClient(object):

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
        temp_sentiment = ""
        # set sentiment
        if analysis.sentiment.polarity > 0:
            temp_sentiment = 'positive'
        elif analysis.sentiment.polarity == 0:
            temp_sentiment = 'neutral'
        else:
            temp_sentiment = 'negative'
        return temp_sentiment

    def get_tweets(self, query, lang, count):
        # list to store tweets
        tweets = []

        # fetch tweets
        fetched_tweets = self.api.search_tweets(q=query, lang=lang, count=count)
        # print(fetched_tweets)

        for tweet in fetched_tweets:
            parsed_tweet = {}
            parsed_tweet['text'] = tweet.text
            parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)
            parsed_tweet['location'] = tweet.user.location
            # tweets.append(parsed_tweet)

            if tweet.retweet_count > 0:
                if parsed_tweet not in tweets:
                    tweets.append(parsed_tweet)
            else:
                tweets.append(parsed_tweet)

        return tweets


def main():
    api = TwitterClient()
    tweets = api.get_tweets(query="WFH WorkFromHome", lang='en', count=1000)
    province_list = ['Ontario', 'Nova Scotia', 'Alberta', 'New Brunswick', 'British Columbia', 'Manitoba', 'Nunavut',
                    'Newfoundland and Labrador', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon', 'Northwest Territories']
    for tweet in tweets:
        tweet['location'] = random.choice(province_list)

    pos_tweet = []
    neg_tweet = []
    nut_tweet = []
    for tweet in tweets:
        if "positive" == tweet['sentiment']:
            pos_tweet.append(tweet)
        elif "neutral" == tweet['sentiment']:
            nut_tweet.append(tweet)
        elif "negative" == tweet['sentiment']:
            neg_tweet.append(tweet)

    province_list = ['Ontario', 'Nova Scotia', 'Alberta', 'New Brunswick', 'British Columbia', 'Manitoba', 'Nunavut',
                    'Newfoundland and Labrador', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon', 'Northwest Territories']
    final_data = []

    for province in province_list:
        json_data = []
        words = ""
        for tweet in tweets:
            if province == tweet['location']:
                words = words + tweet['text']

        for word in words.split():
            word = re.sub(r'^https?:\/\/.*[\r\n]*', '', word.lower(), flags=re.MULTILINE)
            word = ''.join(item for item in word.lower() if item.isalnum())
            word = word.lower().strip()
            if word:
                if word not in stopwords.words():
                    flag = True
                    if json_data:
                        for dict_of_data in json_data:
                            if dict_of_data['text'] == word:
                                dict_of_data['value'] = dict_of_data['value'] + 1
                                flag = False
                                break
                        if flag:
                            json_data.append({'text': word, 'value': 1})

                    else:
                        json_data.append({'text': word, 'value': 1})

        json_data = (nlargest(len(json_data), json_data, key=lambda dict: dict["value"]))
        pos_json_data = []
        pos_words = ""
        for tweet in pos_tweet:
            if tweet['location'] == province:
                pos_words = pos_words + tweet['text']

                for word in pos_words.split():
                    word = re.sub(r'^https?:\/\/.*[\r\n]*', '', word.lower(), flags=re.MULTILINE)
                    word = ''.join(item for item in word.lower() if item.isalnum())
                    word = word.lower().strip()
                    if word:
                        if word not in stopwords.words():
                            flag = True
                            if pos_json_data:
                                for dict_of_data in pos_json_data:
                                    if dict_of_data['text'] == word:
                                        dict_of_data['value'] = dict_of_data['value'] + 1
                                        flag = False
                                        break
                                if flag:
                                    pos_json_data.append({'text': word, 'value': 1})

                            else:
                                pos_json_data.append({'text': word, 'value': 1})

        neg_json_data = []
        neg_words = ""
        for tweet in neg_tweet:
            if tweet['location'] == province:
                neg_words = neg_words + tweet['text']

                for word in neg_words.split():
                    word = re.sub(r'^https?:\/\/.*[\r\n]*', '', word.lower(), flags=re.MULTILINE)
                    word = ''.join(item for item in word.lower() if item.isalnum())
                    word = word.lower().strip()
                    if word:
                        if word not in stopwords.words():
                            flag = True
                            if neg_json_data:
                                for dict_of_data in neg_json_data:
                                    if dict_of_data['text'] == word:
                                        dict_of_data['value'] = dict_of_data['value'] + 1
                                        flag = False
                                        break
                                if flag:
                                    neg_json_data.append({'text': word, 'value': 1})

                            else:
                                neg_json_data.append({'text': word, 'value': 1})

        nut_json_data = []
        nut_words = ""
        for tweet in nut_tweet:
            if tweet['location'] == province:
                nut_words = nut_words + tweet['text']

                for word in nut_words.split():
                    word = re.sub(r'^https?:\/\/.*[\r\n]*', '', word.lower(), flags=re.MULTILINE)
                    word = ''.join(item for item in word.lower() if item.isalnum())
                    word = word.lower().strip()
                    if word:
                        if word not in stopwords.words():
                            flag = True
                            if nut_json_data:
                                for dict_of_data in nut_json_data:
                                    if dict_of_data['text'] == word:
                                        dict_of_data['value'] = dict_of_data['value'] + 1
                                        flag = False
                                        break
                                if flag:
                                    nut_json_data.append({'text': word, 'value': 1})

                            else:
                                nut_json_data.append({'text': word, 'value': 1})

        for data in json_data:
            initial_data = {
                "label": None,  # from data in json_data:
                "volume": 0,  #
                "sentiment": {},
                "sentimentScore": 0,
                "location": None
            }
            sentiments = {
                "positive": 0,
                "negative": 0,
                "neutral": 0
            }

            initial_data['label'] = data['text']
            initial_data['volume'] = data['value']
            initial_data['location'] = province
            for pos_data in pos_json_data:
                if data['text'] == pos_data['text']:
                    sentiments['positive'] = pos_data['value']
            for neg_data in neg_json_data:
                if data['text'] == neg_data['text']:
                    sentiments['negative'] = neg_data['value']
            for nut_data in nut_json_data:
                if data['text'] == nut_data['text']:
                    sentiments['neutral'] = nut_data['value']
            initial_data['sentiment'] = sentiments
            score = max(sentiments['positive'], sentiments['negative'], sentiments['neutral'])

            if score == sentiments['positive']:
                initial_data['sentimentScore'] = score
            elif score == sentiments['negative']:
                initial_data['sentimentScore'] = -score
            else:
                initial_data['sentimentScore'] = 0

            final_data.append(initial_data)
            # print("Final Data", final_data)
    json_string = json.dumps(final_data)
    with open('WFHWordCloud.json', 'w') as outfile:
        outfile.write(json_string)
        print("The json file is created")

if __name__ == "__main__":
    # calling main
    main()
