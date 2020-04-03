---
title: "The Ultimate Guide to Token Authentication in Django Rest Framework"
date: "2020-04-02"
summaryPoints:
  [
    "Use the DRF Token Authentication",
    "Use Django Authentication System for login",
    "Create a custom user model by extending AbstractUser",
  ]
tag: "tutorial"
---

Many modern applications with a data layer will require to filter and limit requests by roles. The system to achieve such a functionality is called an `authentication system`. An authentication system consists of two processes: `authentication` and `authorization`. The former being tied to identification and the latter to accessibility.
Here is a concise explanation on their differences <a href="https://auth0.com/docs/authorization/concepts/authz-and-authn">Authentication vs Authorization</a>.

In this article, we learn how to implement a Token based authentication system in a Django API using the combined power of DRF and Django. This tutorial will not explain the basics of <a>setting up a django application</a> and will assume that you have already installed <a>the Python interpreter</a> on your Linux machine.

#### Step-1: Application Setup

Before we begin, let us setup a Django Application.

```shell
monkpad:~/Desktop/ed$ python3 -m venv venv
monkpad:~/Desktop/ed$ source venv/bin/activate
(venv) monkpad:~/Desktop/ed$ pip install django djangorestframework
(venv) monkpad:~/Desktop/ed$ django-admin startproject wiltut
(venv) monkpad:~/Desktop/ed$ cd wiltut
(venv) monkpad:~/Desktop/ed/wiltut$ django-admin startapp authentication
```

<br/>

At this point, you should have your project setup and an application called <strong>authentication</strong> in the root directory. You maybe tempted to run `migrations`, don't. More on this in a moment.

To make DRF work, we need to do a couple more setups. First, open your project and add `rest_framework` and `rest_framework.authtoken` in your list of `INSTALLED_APPS` located in the `settings.py` module. Secondly, configure the <a href="https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication">TokenAuthentication</a> by adding the following block of code in your `settings.py`:

```py
INSTALLED_APPS = [
    ...
    #for drf
    'rest_framework',
    #for token authentication
    'rest_framework.authtoken',
    ...
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # we define TokenAuthentication as our default
        #...authentication classs
        'rest_framework.authentication.TokenAuthentication',
    ]
}
```

<br/>

That is it with the setup. Let us move on to the next step.

#### Step-2: Create a Custom User Manager

Before creating a custom user model, we need to create a custom user <a href="https://docs.djangoproject.com/en/3.0/topics/db/managers/">manager</a>. Our yet to be created user model will have a phonenumber field which is an addition to the other fields inherited from AbstractUser class. For such a custom user model, Django <a href="https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#writing-a-manager-for-a-custom-user-model">recommends</a> a custom user manager.

We begin by creating a method to create a user using email and phonenumber as opposed to username only. In the `models.py` module, add the following code to get started.

```py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):

    # we tell django to user this manager in migration instead
    # ... of the default UserManager
    use_in_migrations = True

    # Define a new method that uses email and phone number to
    # ... to add records to the db
    # we start the name with an underscore to avoid accidental override
    # ...of create_user
    def _create_user(self, email, phonenumber, password, **extra_fields):
        """Creates and saves a user given the email, phonenumber and password
        """

        if not email:
            raise ValueError("Please provide an email to continue")
        elif not phonenumber:
            raise ValueError("Please provide an phone number to continue")

        # We use the normalize_email method from BaseUserManager
        # ...to normalize the email
        email = self.normalize_email(email)

        # we create an instance of the user with email and phonenumber
        user = self.model(email=email, phonenumber=phonenumber, **extra_fields)

        # We use the instance method set_password() to update the password
        #... of the user instance
        user.set_password(password)

        # we save the instance in the database
        user.save(using=self._db)
        return user

```

We then override both the `create_user` and `create_superuser` methods. In the same `models.py` module, add the following code:

```py
    ...
    # existing imports
    ...

class UserManager(BaseUserManager):

    ....
    # existing code
    ....

    def create_user(self, email, phonenumber, password, **extra_fields):
        """Overrides the create_user method from the BaseUserManager class"""

        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, phonenumber, password, **extra_fields)

    def create_superuser(self, email, phonenumber, password, **extra_fields):
        """Overrides the create_superuser method from the BaseUserManager"""

        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        if extra_fields.get('is_superuser') is not True or \
            extra_fields.get('is_staff') is not True:
            raise ValueError('Super user must be flagged True')

        return self._create_user(email, phonenumber, password, **extra_fields)
```
<br/>

Great. Now we have our manager in place, the next step is to create our custom user model.

#### Step-3: Create a Custom User Model

Django <a href="https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project">recommends</a> that you create a custom user model for every new project. You can do this by inheriting either of the two classes: `AbstractUser` or `AbstractBaseUser`. The choice for either relies on how custom you want your User model. In our example, we will extend `AbstractUser`.

In the `models.py` module, add the following block of code to implement the custom User.

```py
...
# existing code
...
class User(AbstractUser):
    #remove the username from the fields
    username = None

    email = models.EmailField(unique=True, blank=True, null=True)
    phonenumber = models.CharField(max_length=12)

    # we tell the model use our custom UserManager
    objects = UserManager()

    # we tell Django to use email for auth instead of username
    USERNAME_FIELD = "email"

    # we ensure to raise an error in the case phonumber is not provided
    REQUIRED_FIELDS = ['phonenumber']
```
That is all that there is for the User model. We simply define an email field to replace the username and add an extra phonenumber field. However, one last thing to do before we are done:

In your `settings.py` module, tell Django to use our custom model for authentication.

```py
...

AUTH_USER_MODEL = 'authentication.User'

...
```

Finally, we can run our `migrations`. Speaking of migrations. Remember when I told you not run migrations at first? Well, it is is because it is <a href="https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project">recommended</a> to point your `AUTH_USER_MODEL` to the custom User model before running your initial migrations.

If you are looking to customize the User model mid project, you should look at this <a href="https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#changing-to-a-custom-user-model-mid-project">section of the documentation</a>. 

We now have our custom user manager. We now need to add views to allow for user input.

#### Step-4: Add Views and Serializers

This is where the Django Rest Framework shines. We will use the Modelviewset and ModelSerializers to abstract much of the unnessary work.

###### 1. Signup


First, create a new module in `authentication` called `serializers.py` and add the following code to it:

```py
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # on signup we serialize these user attributes
        fields = ['first_name', 'last_name', 'phonenumber', 'email', 'password']

        #we specify that password should not be returned after signup
        extra_kwargs = {'password': {'write_only': True}}
```
Then in the `views.py` module of the authentication, add the following code:

```py
from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer

class UserSignupView(generics.CreateAPIView):
    permission_classes =(permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
```
Finally, create a `urls.py` module in the authentication directory and add the following code to create the routing.

```py
from django.urls import path
from .views import UserSignupView

urlpatterns = [
    path('/signup', UserSignupView.as_view()),
]
```
Then in the main `url.py` module in the projects root, add a path to point to the `authentication.url` module.
```py
urlpatterns = [
    ...
    # existing code
    ...
    path('api', include('authentication.urls')),
]
```
Now if you power up your server and navigate to `127.0.0.1:8000/api/signup`, you should be able to see a form for creating a new user. Go ahead and create one.

Everything seems good except one near invisible problem. If you access the `authentication.user` table of your database (<em>you can use <a href="https://sqliteonline.com/">sqliteonline.com</a></em>), you will notice that your password is in plain text. This is a grave security issue. Also, when we try to login, the passwords may not match.

Let's fix that.

DRF provides us with the power to perfom before and after effect on instances before they are saved in the database through the `perfom_create` method. We will override this method inorder to hash password.

In your `views.py` module, inside the UserSignupView, enter the following code:

```py

...
exisiting imports
...
from django.contrib.auth.hashers import make_password

class UserSingupView(generics.CreateAPIView):
    ...
    exisiting code
    ...

    def perform_create(self, serializer):
            _pass = make_password(serializer.validated_data['password'])
            serializer.validated_data['password'] = _pass
            return super().perform_create(serializer)
```
Now create another user and check the `authentication.user` table again. You will notice that the new user's password is hashed.

We are making progress. We can now signup into our Django API. Let's now implement login to make the cycle complete.

###### 2. Login

The login serializer is quite similar to the signup serializer with the only diference being the nuber of fields to dislay to the user.

To define the login serializer, add the following code to the `serializers.py` module:

```py
...
#existing code
...

class LoginSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User

        # on signup we return all the user attributes
        fields = ['first_name', 'last_name', 'phonenumber', 'email', 'password']

        # we set all fields except email and password to readonly
        read_only_fields = ['first_name', 'last_name', 'phonenumber']

        #finally, password should not be read
        extra_kwargs = {'password': {'write_only': True}}
```
We then need to add a view for loggin. This is where the magic lies. We will start by overriding the `createAPIView`'s`post` method. This will allow us to perform cusom checks and customize the error messages for the user. We will then use Django's `login` method to record some of our user's attributes such as `last_login`.

Let's dive in. In your `views.py` module, add the following code:

```py

...
#existing imports
...
from django.contrib.auth import login

...
#existing code
...
class LoginView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = LoginSerializer

    #override the post method to customize error messages
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        #first try...except block checks for empty email and password fields
        try:
            if not email:
                raise Exception('Email cannot be blank!')
            if not password:
                raise Exception('Password cannot be blank!')
        except Exception as error:
            raise exceptions.AuthenticationFailed({'error': error})

        #second try...except block ensures a user with such email exists
        try:
            user = User.objects.get(email=email)
        except Exception as error:
            raise exceptions.AuthenticationFailed(
                {'error': 'Invalid Email or Password!'})

        #last try...except block checks that password is correct
        try:
            if user and user.check_password(password):

                #we use django's login method to login
                login(request, user)

                serializer = LoginSerializer(user)

                return response.Response(
                    data={'message': 'Success!', 'user': serializer.data}, status=200)

            raise Exception('Invalid Email or Password!')

        except Exception as error:
            raise exceptions.AuthenticationFailed({'error': error})
```
Note that Django User model provides the <a href="https://docs.djangoproject.com/en/3.0/ref/contrib/auth/#django.contrib.auth.models.User.check_password"> `user.check_password`</a> method for checking plain text password against hashed passwords.

Finally, add the routing to the login page. In the `urls.py` module of the authentication app, add the following code:

```py
...
#exisiting imports
...
from .views import UserSignupView, LoginView

urlpatterns = [
    ...
    #exisiting coe
    ...
    path('login', LoginView.as_view())
]

```
Now if you navigate to `/login` and login using the email and password you used to signup, your request will be processed successfuly. Now the icing on the cake, generate Tokens.

#### Step-5: Generate Tokens

We first serialize the data returned by the token. In your `seriazliers.py`, add the followin block of code:

```py
...
#existing imports
...
from rest_framework.authtoken.models import Token


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = '__all__'
```
Then in your `views.py`, we generate the token in the `LoginView` class:

```py
...
#existing imports
...
from .serializers import UserSerializer, LoginSerializer, TokenSerializer
from rest_framework.authtoken.models import Token

class LoginView(generics.CreateAPIView):
    ...
    #existing code
    ...

    def post(self, request, *args, **kwargs):
        ...
        #existing code
        ...

        try:
            if user and user.check_password(password):

                ...
                #existing code
                ...

                #we wrap the Token generation in the try...except block for conditional tokens generation
                try:
                    token = Token.objects.get(user=user)

                    #if a token for specific user already exists
                    #delete it and create a new one
                    token.delete()
                    new_token = Token.objects.create(user=user)

                except Exception:
                    new_token = Token.objects.create(user=user)

                #serialize the token data
                token_serializer = TokenSerializer(new_token)

                return response.Response(
                    data={
                        'message': 'Success!', 
                        'user': serializer.data, 
                        'token': token_serializer.data}, 
                    status=200)

            raise Exception('Invalid Email or Password!')

        except Exception as error:
            raise exceptions.AuthenticationFailed({'error': error})
```
We are done. You will now recieve a token everytime you login. You notice that this Token Authentication is <a href="https://www.geeksforgeeks.org/difference-between-stateless-and-stateful-protocol/">stateful</a> and tokens are stored in the database. This is why we have to delete a token before we generate a new one.

This is the biggest shortcoming of the DRF Token Authentication. 

That is why there exists other production level options including OAuth Toolkit and SimpleJWT. Nonetheless, their implementation follows a similar path. This tutorial may not be exhausitive but I hope it has laid down a template for authentication implementation in your next Django Based API.
