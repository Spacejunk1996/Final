function headLink(req) {
    var link = [];
    if(req.signedCookies.user) {
        const obj1 = {"link": "javascript:void(0);", "content": req.signedCookies.user};
        const obj2 = {"link": "/logout", "content": "Log Out"};
        link.push(obj1);
        link.push(obj2);
    }
    else {
        const obj1 = {"link": "/signin", "content": "Sign In"};
        const obj2 = {"link": "/signup", "content": "Sign Up"};
        link.push(obj1);
        link.push(obj2);
    }
    return link;
}

module.exports = headLink;