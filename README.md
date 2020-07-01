## Visa Concierge  Service API
### Installation
#### Activate Virtual Environment
```
python3 -m venv venv  
source ./venv/bin/activate
```
#### Install Dependencies
```
pip install -r requirements.txt
```
#### (Optional) Create Superuser
```
python manage.py createsuperuser
```
#### Migrate DB and runserver
```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
