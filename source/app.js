const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 5000
const geocode = require('./utils/geocode');
const forecast = require('./utils/forcast');

const hbs = require('hbs');

//if you RE RUNNING THE NODEMON YOU SHOULD ADD -e COMMAND (EXTENSION) to look for partial (**IMP);

// console.log(__dirname);
const myfile = (path.join(__dirname, '../public'));
const path_work = path.join(__dirname, '/templates/views');

const partial_path = path.join(__dirname, '/templates/partial');

// it is used toi set hbs
app.set('view engine', 'hbs');

// to register the path for partial
hbs.registerPartials(partial_path);

// we use this because default is views only in  express
app.set('views', path_work);


//to use express to render path static only
app.use(express.static(myfile));

// used tpo load the HBS file
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Ifham'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'bhayya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'aap bahut hee achee insaan hai',
        title: "OMG"
    })
})



// app.get('/help', (req, res) => {
//     res.send(myfile1)
// });


// app.get('/about', (req, res) => {
//     res.send('<h1>WOW BHAYYA</h1>')
// });


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You have to provide an address"
        })
    }
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error: "Some error occured"
            })
        } else {
            // console.log('Data', data);
            // console.log('error', error);

            forecast(longitude, latitude, location, (error, data) => {
                if (error) {
                    return res.send({
                        error: "Some error occured"
                    })
                } else {
                    // console.log('Error', error)
                    res.send({
                        data
                    })
                }

            })
        }

    })
});


app.get('/products', (req, res) => {
    if (!req.query.serch) {
        return res.send({
            error: "Bhayya Shi daalo plzz"
        })
    }
    console.log(req.query.games)
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "help article not found"
    });
})
// to display error 404 messgae we used it at the last
app.get('*', (req, res) => {
    res.render('404', {
        error: "Page not found"
    })

})

app.listen(port, () => {
    console.log('server is up on port' + port);
});