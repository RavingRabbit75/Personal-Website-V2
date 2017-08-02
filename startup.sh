echo ''
echo '--------------------------------------------------------------'
echo 'Starting Personal Website tools installation'
echo ''

# need virtualenv


mkvirtualenv personal_website
pip install ipython Flask Flask-Testing
pip install ipython Flask-Restful


# workon personal_website
# python3 app.py