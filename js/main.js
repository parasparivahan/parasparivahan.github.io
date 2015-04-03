(function () {

	var contentNode = document.getElementById("ppl-main-content"),
		ValidateContactForm,
		contactListener = false,
		navNode = document.getElementById("navigation"),
		homeData,
		validateEmail =  function (val) {
          // Regular Expression copied from stack overflow [46155]
	        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return re.test(val);
	    };

	navNode.addEventListener('click', function (e) {
		var target = e.target || e.srcElement, type, data;
		if (target) {
			if (target.nodeName !== 'A') return;
			e.stopPropagation();
			e.preventDefault();
			type = target.getAttribute('data-attr');
			data = WEB_DATA[type];
			contentNode.innerHTML = data;
			if (!contactListener) {
				ValidateContactForm(contentNode);
				contactListener = true;
			}
		}
	}, false);

	/* Initial Load */
	homeData = WEB_DATA.home;
	contentNode.innerHTML = homeData;

	ValidateContactForm = function (node) {
		var form = node.getElementsByTagName('form');
		form[0].addEventListener("submit", function(e) {
			e.preventDefault();
			e.stopPropagation();
			var name = document.ContactForm.Name,
				email = document.ContactForm.Email,
				subject = document.ContactForm.Subject,
				comment = document.ContactForm.Comment, check = true,
				http, url, params;

			if (name.value.trim() === "")
			{
				name.classList.add("error-border");
				check = false;
			}
			if (comment.value.trim() === "")
			{
				comment.classList.add("error-border");
				check = false;
			}
			if (subject.value.trim() === "")
			{
				subject.classList.add("error-border");
				check = false;
			}

			if (email.value.trim() === "")
			{
				email.classList.add("error-border");
				check = false;
			} else {
				check = validateEmail(email.value);
				if (!check) {
					email.classList.add("error-border");
				}
			}
			if (check) {
				var a = document.createElement("a");
				params = "?body=" + "Name: " + name.value.trim() + "%0A" +
						"Email: " + email.value.trim() + "%0A" + "Comment: " + comment.value.trim() + "&subject=" + subject.value.trim();
				a.href = this.action + params;
				document.body.appendChild(a);
				a.click();
			}
	    });
	}
})();