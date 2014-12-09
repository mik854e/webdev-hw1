from app import app

if __name__ == "__main__":
    app.debug = True
    app.config['SECRET_KEY'] = 'secret'
    app.run()