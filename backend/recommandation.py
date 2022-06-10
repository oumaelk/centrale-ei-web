import numpy as np
import pandas as pd
from pymongo import MongoClient
import matplotlib.pyplot as plt
from sklearn import model_selection
from sklearn.metrics.pairwise import pairwise_distances
from scipy import stats
from math import sqrt
import certifi
from pandas import pivot_table
from sklearn.metrics.pairwise import pairwise_distances
from sklearn import model_selection
from scipy import stats


def get_database():

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb://group11:BVxdH7gsDyRfjQNk@cs2022.lmichelin.fr:27017/group11?ssl=true"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['group11']


def predict(ratings, similarity, type='user'):
    if type == 'user':
        mean_user_rating = ratings.mean(axis=1)
        # You use np.newaxis so that mean_user_rating has same format as ratings
        ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
        pred = mean_user_rating[:, np.newaxis] + similarity.dot(
            ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    elif type == 'movie':
        pred = ratings.dot(similarity) / \
            np.array([np.abs(similarity).sum(axis=1)])
    return pred


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":

    # Get the database
    dbname = get_database()

    movies = dbname["movies"].find()
    print(list(movies))

    data_cols = ['user_id', 'movie_id', 'rating', 'timestamp']
    movie_cols = ['movie id', 'movie title', 'release date', 'video release date', 'IMDb URL', 'unknown', 'Action',
                  'Adventure', 'Animation', 'Childrens', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film-Noir', 'Horror',
                  'Musical', 'Mystery', 'Romance ', 'Sci-Fi', 'Thriller', 'War', 'Western']
    user_cols = ['user id', 'age', 'gender', 'occupation', 'zip code']

    # 

    nb_movies = data_cols.movie_id.unique().shape[0]

    ratings = pd.DataFrame(data_cols.groupby('movie_id')['rating'].mean())

    ratings['number_of_ratings'] = data_cols.groupby('movie_id')[
        'rating'].count()

    train_data, test_data = model_selection.train_test_split(
        get_database(), test_size=0.25)

    movie_matrix = train_data.pivot_table(
        index='user_id', columns='item_id', values='rating')
    train_data_matrix = np.zeros((nb_users, nb_movies))
    for line in train_data.itertuples():
        # print(line[3])
        train_data_matrix[line[1]-1, line[2]-1] = line[3]
    test_data_matrix = np.zeros((nb_users, nb_movies))
    for line in test_data.itertuples():
        test_data_matrix[line[1]-1, line[2]-1] = line[3]

    user_similarity = pairwise_distances(train_data_matrix, metric='cosine')
    a = np.array([0, 0, 0, 1, 1, 1, 1])
    b = np.arange(7)
    stats.pearsonr(a, b)[0]

    item_similarity = pairwise_distances(train_data_matrix.T, metric='cosine')
    print(item_similarity)

    item_prediction = predict(train_data_matrix, item_similarity, type='movie')
