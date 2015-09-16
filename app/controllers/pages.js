exports.home = function (req, res) {
  res.render('index', {
      title: 'Home page'
    , message: 'This is the "home" action of "pages" controller'
  })
}
exports.about = function (req, res){
	res.render('about',{
		title : "About page",
		message: "This is about page"
	})
}