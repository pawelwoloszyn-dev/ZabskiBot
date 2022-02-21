# ZabskiBot

It's very simple twitter bot based on google cloud functions. It is used to retweet all tweets found by query specied in the parameter.

## How it works

It's very simple.

1. Trying to login by API v1 credentials.
2. Find latest tweet id on specified in code account (self account). (TODO: need to move them into environment variable)
3. Find all tweets on twitter posted after latest my tweet (on self account) and which fulfill the query specified in the function parameter
4. Retweet everything found