import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn import model_selection
from sklearn.metrics.pairwise import pairwise_distances
from scipy import stats
from math import sqrt
from sklearn.metrics import mean_squared_error
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

path = 'https://api.themoviedb.org/3/movie/popular?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&language=en-US&page=1'

# column headers for the dataset
data_cols = ['user_id', 'item_id', 'rating', 'timestamp']

# items' table :langue genre pays durée trending acteurs date likes réalisation
item_cols = ['movie id', 'movie title', 'release date', 'video release date', 'unknown', 'Action',
             'Adventure', 'Animation', 'Childrens', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Fantasy', 'Film-Noir', 'Horror',
             'Musical', 'Mystery', 'Romance ', 'Sci-Fi', 'Thriller', 'War', 'Western', 'trending', 'français', 'anglais', 'espagnol', 'portugais', 'allemand', 'arabe']


# users' table
user_cols = ['user id', 'age', 'gender', 'occupation', 'zip code']

# importing the data files onto dataframes
users = pd.read_csv(path, sep='|', names=user_cols, encoding='latin-1')
item = pd.read_csv(path, sep='|', names=item_cols, encoding='latin-1')
data = pd.read_csv(path, sep='\t', names=data_cols, encoding='latin-1')

# printing the head of these dataframes
#print("User information")
# print(users.head())

#print("Item information")
# item.head()

#print("Data information")
# data.head()

nb_users = data.user_id.unique().shape[0]
nb_items = data.item_id.unique().shape[0]

movie_matrix = data.pivot_table(
    index='user_id', columns='item_id', values='rating')
# movie_matrix.head()

ratings = pd.DataFrame(data.groupby('item_id')['rating'].mean())
# ratings.head()

train_data, test_data = model_selection.train_test_split(data, test_size=0.25)
# print("Taindata\n")
# print(train_data.head())
#print("test_data", test_data.head())


# Memory-based
movie_matrix = train_data.pivot_table(
    index='user_id', columns='item_id', values='rating')
movie_matrix.head()

train_data_matrix = np.zeros((nb_users, nb_items))
for line in train_data.itertuples():
    train_data_matrix[line[1]-1, line[2]-1] = line[3]

print(train_data_matrix)
test_data_matrix = np.zeros((nb_users, nb_items))
for line in test_data.itertuples():
    test_data_matrix[line[1]-1, line[2]-1] = line[3]

print(test_data_matrix)
user_similarity = pairwise_distances(train_data_matrix, metric='cosine')
print(user_similarity)


def predict(ratings, similarity, type='user'):

    if type == 'user':
        print(len(ratings[1]))
        mean_user_rating = ratings.mean(axis=1)
        # You use np.newaxis so that mean_user_rating has same format as ratings
        ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
        pred = mean_user_rating[:, np.newaxis] + similarity.dot(
            ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    elif type == 'item':
        pred = ratings.dot(similarity) / \
            np.array([np.abs(similarity).sum(axis=1)])
    return pred


user_prediction = predict(train_data_matrix, user_similarity, type='user')
print(user_prediction)


def rmse(prediction, ground_truth):
    prediction = prediction[ground_truth.nonzero()].flatten()
    ground_truth = ground_truth[ground_truth.nonzero()].flatten()
    return sqrt(mean_squared_error(prediction, ground_truth))


print('User-based CF RMSE: ' + str(rmse(user_prediction, test_data_matrix)))
sparsity = round(1.0-len(data)/float(nb_users*nb_items), 3)
print('The sparsity level of MovieLens100K is ' + str(sparsity*100) + '%')
