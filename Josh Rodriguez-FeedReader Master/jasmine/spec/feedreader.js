/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    
    describe('RSS Feeds', function() {
        /* This is a test to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it ('each has an URL', function () {
                for (let feed of allFeeds) {
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).toBeGreaterThan(0);
                }
         });
        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each has a name', function(){
                for (let feed of allFeeds) {
                    expect(feed.name).toBeDefined();
                    expect(feed.name.length).toBeGreaterThan(0);
                }
         });
    });

    describe ('The Menu', function (){
        /* This is a test that ensures the menu element is
         * hidden by default. 
         */
        it ('is hidden by default', function (){
            let hiddenMenu = document.body.classList.contains('menu-hidden');
            expect(hiddenMenu).toBe(true);
        });
        /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('changes when clicked', function (){
            let menuBars = document.querySelector('.menu-icon-link');
            menuBars.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            menuBars.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe ('Initial Entries', function (){
        beforeEach(function (done) {
            loadFeed(0,done);
        });
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it ('at least one entry is in the feed', function (done){
            let entries = document.querySelectorAll('.feed .entry')
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    describe ('New Feed Selection', function (){
        let firstFeed,
            secondFeed;
        beforeEach(function(done){
            //creates the first feed and saves the value to the firstFeed variable.
            loadFeed(0, function(){
                firstFeed = document.querySelector('.feed').innerHTML;
	            //creates the second feed and saves the value to the secondFeed variable.
	            loadFeed(1, function(){
	                secondFeed = document.querySelector('.feed').innerHTML;
	                done();
	            });
            });
        });
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it ('content changes when new feed is loaded', function (){
            expect(firstFeed !== secondFeed).toBe(true);
        });
    });

}());
