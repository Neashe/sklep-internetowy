from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///demo.db'
app.config['JWT_SECRET_KEY'] = "super-secret"
jwt = JWTManager(app)

db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    email = db.Column(db.String(50), unique=True)
    hashedPassword = db.Column(db.String(250))
    type = db.Column(db.String(25))

class Product(db.Model):
    productID = db.Column(db.Integer, primary_key=True)
    productName = db.Column(db.String(100))
    category = db.Column(db.String(50))
    price = db.Column(db.Double)
    quantity = db.Column(db.Integer)
    rating = db.Column(db.Double)
    description = db.Column(db.String(250))
    thumbnail = db.Column(db.String(100))

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class ProductSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Product

@app.route('/products', methods = ['GET'])
def products():
    products = Product.query.all()

    productSchema = ProductSchema(many=True)
    result = productSchema.dump(products)

    return jsonify(result)

@app.route('/products/count', methods = ['GET'])
def products_count():
    product_number = Product.query.count()
    print(product_number)

    return jsonify({'count':product_number})

@app.route('/products/ids', methods=['GET'])
def product_ids():
    product_ids = [product.productID for product in Product.query.all()]
    print(product_ids)

    return jsonify({'product_ids': product_ids})

@app.route('/products/<int:id>', methods = ['GET'])
def product(id):
    product = Product.query.get(id);
    print(product);

    productSchema = ProductSchema(many=False)
    result = productSchema.dump(product)

    return jsonify(result)

@app.route('/products', methods=['POST', 'OPTIONS'])
def add_products():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    data = request.get_json()

    productSchema = ProductSchema()
    error = productSchema.validate(data)

    if error:
        return jsonify({'error': error}), 400
    
    newProduct = Product(
        productName=data["productName"],
        category=data["category"],
        price=data["price"],
        quantity=data["quantity"],
        rating=data["rating"],
        description=data["description"],
        thumbnail=data["thumbnail"]
    )

    db.session.add(newProduct)
    db.session.commit()

    result = productSchema.dump(newProduct)

    return jsonify(result)

@app.route('/products/delete/<int:productId>', methods=['DELETE', 'OPTIONS'])
def delete_product(productId):
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'DELETE')
        return response
    product = Product.query.get(productId)

    if not product:
        return jsonify({'error': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({'messege': 'Product deleted successfully'})

@app.route('/products/modify/<int:productId>', methods=['PUT', 'OPTIONS'])
def modify_product(productId):
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'DELETE')
        return response

    product = Product.query.get(productId)

    data = request.get_json()

    product.productName = data.get("productName", product.productName)
    product.category = data.get("category", product.category)
    product.price = data.get("price", product.price)
    product.quantity = data.get("quantity", product.quantity)
    product.rating = data.get("rating", product.rating)
    product.description = data.get("description", product.description)
    product.thumbnail = data.get("thumbnail", product.thumbnail)

    db.session.commit()

    return jsonify({'message': 'Product modified succesfully'})

@app.route('/products/categories', methods=['GET'])
def get_categories():
    products = Product.query.all()

    categories = set(product.category for product in products)

    return jsonify(list(categories))

@app.route('/')
def check():
    return jsonify('Hello World')

@app.route('/users', methods=['GET'])
def users():
    users = User.query.all()

    userSchema = UserSchema(many=True)
    result = userSchema.dump(users)

    return jsonify(result)

@app.route('/user', methods=['GET'])
@jwt_required()
def user():
    user_email = get_jwt_identity()

    user = User.query.filter_by(email=user_email).first()

    if user:
        return jsonify({
            'id': user.id,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'email': user.email,
            'hashedPassword': user.hashedPassword,
            'type': user.type
        })
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/user/type', methods=['GET'])
@jwt_required()
def userType():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if user:
        return jsonify({'type': user.type})
    else:
        return jsonify({'message': 'User not found'}), 404


@app.route('/user/modify/<int:id>', methods=['PUT', 'OPTIONS'])
def userModify(id):
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'PUT')
        return response
    
    user = User.query.get(id)

    data = request.get_json()

    user.firstname = data.get("firstname", user.firstname)
    user.lastname = data.get("lastname", user.lastname)
    user.email = data.get("email", user.email)
    user.hashedPassword = data.get("hashedPassword", user.hashedPassword)
    user.type = data.get("type", user.type)

    db.session.commit()

    userSchema = UserSchema()
    result = userSchema.dump(user)

    return jsonify(result)


@app.route("/user/add", methods=['POST', 'OPTIONS'])
def addUser():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'PUT')
        return response

    data = request.get_json()

    userSchema = UserSchema()
    error = userSchema.validate(data)

    if error:
        return jsonify({'error': error}), 400
    
    newUser = User(
        firstname=data["firstname"],
        lastname=data["lastname"],
        email=data["email"],
        hashedPassword=data["hashedPassword"],
        type=data["type"]
    )

    db.session.add(newUser)
    db.session.commit()

    result = userSchema.dump(newUser)

    return jsonify(result)

@app.route("/login", methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'PUT')
        return response
    
    email = request.json.get("email", None)
    hashedPassword = request.json.get("hashedPassword", None)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "User not found"}), 401
    
    if user.hashedPassword != hashedPassword:
        return jsonify({"msg": "Bad password"}), 401
    
    access_token = create_access_token(identity=email)

    return jsonify(token=access_token)

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_email = get_jwt_identity()
    return jsonify(logged_in_as=current_email), 200
    
@app.route("/protected/employee", methods=["GET"])
@jwt_required()
def protectedEmployee():
    current_email = get_jwt_identity()

    user_type = User.query.filter_by(email=current_email).first().type

    if user_type == "employee":
        return jsonify(logged_in_as=current_email), 200
    else:
        return jsonify(msg="You do not have permission to access this page."), 403


if __name__ == '__main__':
    app.run()
