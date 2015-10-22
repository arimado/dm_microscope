
Template.postsList.onRendered(function() {
	this.find('.wrapper')._uihooks = {

		insertElement:function (node, next) {

			$(node).hide().insertBefore(next).fadeIn(); 

		},

		moveElement: function(node, next) {

			//node is the element currently being moved to a new position in the DOM.

			//next is the element right after the new position that node is being moved to.
				
			var $node = $(node), $next = $(next); 
			var oldTop = $node.offset().top; 
			var height = $node.outerHeight(true); 


			//nextUntil(selector): get all elements after the target element up to (but not including) the element matched by selector.

			var $inBetween = $next.nextUntil(node);

			if($inBetween.length === 0) {
				$inBetween = $node.nextUntil(next); 
			}

			//insertBefore(selector): insert an element before the one matched by selector.

			$node.insertBefore(next);

			//offset(): retrieve the current position of an element relative to the document, and returns an object containing top and left properties.

			var newTop = $node.offset().top; 

			// move node *back* to where it was before

			$node.removeClass('animate').css('top', oldTop - newTop);

			// push every other element down (or up) to put them back

			$inBetween.removeClass('animate').css('top', oldTop < newTop ? height : -1 * height); 

			$node.offset(); 

			$node.addClass('animate').css('top', 0);
			$inBetween.addClass('animate').css('top', 0); 


		}, 

		removeElement: function(node) {
			$(node).fadeOut(function() {
				$(this).remove(); 
			});
		}
	}
});	