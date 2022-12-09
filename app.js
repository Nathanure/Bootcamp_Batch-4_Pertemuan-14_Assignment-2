// Import third-party module
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { validationResult, check, body } = require('express-validator')
const morgan = require('morgan')
// Import local module
const locfunc = require('./public/js/main')
// Variable for express
const app = express()
// Variable for port
const port = 3000

// Basic setup using EJS with Express JS
app.set('view engine', 'ejs')
// Basic setup using Express-ejs-layouts with Express JS
app.use(expressLayouts)
// Allow middleware to execute these assets to public or web browser
app.use(express.static('public'))
// Parse the inputted form in contact
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.use(morgan('dev'))

// Functions to render and switch directories in URL
app.get('/', (req, res) => {
    res.render('index', {
        name: 'Nathanure',
        title: 'Home',
        layout: 'layout/html'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Nathanure',
        title: 'About',
        layout: 'layout/html'
    });
})
app.get('/contact', (req, res) => {
    // Display all data in JSON
    res.render('contact', {
        name: 'Nathanure',
        title: 'Contact',
        layout: 'layout/html',
        contact: locfunc.showJSON(),
        err: []
    });
})
app.post('/contact',
    body('name').trim().notEmpty().withMessage('Please enter your name').isAlpha().withMessage('Please enter a valid name'),
    body('email').trim().notEmpty().withMessage('Please enter your email').isEmail().withMessage('Please enter a valid email'),
    body('mobile').trim().notEmpty().withMessage('Please enter your phone number').isMobilePhone('id-ID').withMessage('Please enter a valid phone number'),
    (req, res) => {
        const nama = req.body.name;
        const email = req.body.email;
        const telp = req.body.mobile;
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('contact', {
                title: 'Contact',
                layout: 'layout/html',
                contact: locfunc.showJSON(),
                err: errors.array()
            })
        } else {
            locfunc.addJSON(nama, email, telp);
            res.redirect('/contact')
        }
    }
)
// app.post('/contact',
//     // name must be alphabet
//     check('name', 'Must be an alphabet').isAlpha('en-US'),
//     // email must be email
//     check('email', 'Must be an email').isEmail(),
//     // mobile must be phone number
//     check('mobile', 'Must be a valid phone number').isMobilePhone('id-ID'),
//     (req, res) => {
//         const error = validationResult(req);
//         const nama = req.body.name;
//         const email = req.body.email;
//         const telp = req.body.mobile;
//         contact = locfunc.showJSON();
//         add = locfunc.addJSON(nama, email, telp);
//         if (error.isEmpty()) {
//             res.redirect('/contact')
//         } else {

//         }
//         res.render('contact', {
//             name: 'Nathanure',
//             title: 'Contact',
//             layout: 'layout/html',
//             error: error.array(),
//             contact
//         });
//     });
// :id is to give url a parameter
app.get('/contact/:id', (req, res) => {
    // To callback the parameters that are in the URL, use req.params.id
    // To callback the query from URL, use ?<queryName>=<input>
    // before ? sign you can put an :id, make sure to define it first
    // And make sure the query in URL is the same as <queryName> in the code 

    // res.send(`Product ID: ${(req.params.id)}<br>Category: ${(req.query.idCat)}`);
    contact = locfunc.searchJSON(req.params.id);
    url = req.params.id;
    res.render('contactDetails', {
        name: 'Nathanure',
        title: 'Contact',
        layout: 'layout/html',
        contact,
        url
    });
})
app.use('/', (req, res) => {
    res.status(404)
    res.render('error', {
        title: 'Page Not Found 404',
        layout: 'layout/error'
    });
})

app.listen(port, () => {
    console.log(`Example app on port ${(port)}`)
})