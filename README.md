# University of Oslo local package for Primo Explore

This is the University of Oslo local customization package for Primo Explore.
It is to be used together with the Bibsys central customization package
(which isn't published and documented openly).

## What have we customized so far?

* Notably, there is a session logging service (also known as *Slurp*) in
  [logging.service.js](https://github.com/uio-library/primo-explore-uio/blob/master/js/logging.service.js).
  Currently it depends on notifications from various directives about events (as an example, the `PrmSearchResultListAfterController` notifies the logging service about searches using `loggingService.searchPageLoaded()`. It would be much cleaner if the logging service could be self-sustained, but at the moment there isn't an open and documented API for Primo Explore apart from the directive hooks. [Primo-expolore-dom](https://github.com/mehmetc/primo-explore-dom) is an interesting project trying to provide a simple domain object model, but at the moment it seems to depend on a lot of undocumented things that might change between Primo versions. Would be great if Ex Libris could support the project or provide something similar.

* In `PrmSearchBarAfterController`, we've set the search input field to automatically get focus.

* In `PrmSearchAfterController`, we move the footer defined in `home_xx_xx.html` to a new DOM location.

* Some light style customization, see [main.scss](https://github.com/uio-library/primo-explore-uio/blob/master/scss/main.scss) for details.

## Setup

1. Clone the [Primo development environment](https://github.com/ExLibrisGroup/primo-explore-devenv) and install dependencies:

   ```
   git clone https://github.com/ExLibrisGroup/primo-explore-devenv.git
   cd primo-explore-devenv
   npm install
   ```

2. Set `PROXY_SERVER` in `gulp/config.js` to this value:

   ```
   var PROXY_SERVER = 'https://bibsys-almaprimo.hosted.exlibrisgroup.com:443';
   ```

3. Download the central package from Primo Back Office (Primo Utilities > UI customization Package Manager)
into `primo-explore/custom` and unzip it. Make sure the folder name is `CENTRAL_PACKAGE`. This contains the modifications from Bibsys. Open question: Do they version control it?

4. Clone the UiO package into `primo-explore/custom`:

   ```
   git clone https://github.com/uio-library/primo-explore-uio.git primo-explore/custom/UIO
   ```

At this point, you should have both `primo-explore/custom/CENTRAL_PACKAGE` and `primo-explore/custom/UIO`.

### Start the UI

We're using scss and browserify, so run

```
gulp run --view UIO --browserify --useScss
```

This builds

* `primo-explore/custom/UIO/css/custom1.css` from `primo-explore/custom/UIO/scss/main.scss`

* `primo-explore/custom/UIO/js/custom.js` from `primo-explore/custom/UIO/js/main.js`


Open http://127.0.0.1:8003/primo-explore/?vid=UIO in your browser. Note: Using localhost instead of 127.0.0.1 may cause zero search results in Chrome (due to a CORS issue?)

## Deploy

1. `gulp run --view UIO --browserify --useScss` (in the `primo-explore-devenv` directory) to make sure the js and css are updated.

2. `eslint js` to check that files are ok-ish.

3. `gulp create-package` and select the UIO package. This creates `packages/UIO.zip`.

4. Log in to [Oria back office](https://bibsys-almaprimo.hosted.exlibrisgroup.com:1443/primo_publishing/admin/acegilogin.jsp)

5. Go to Primo Utilities > UI customization Package Manager

6. Select View: UIO (not UBO)

7. Upload using "Upload package forUBO" [sic] and make sure "inherit from central package" is checked.

8. Click "Deploy"

## Help and documentation

* [Thoughts, ideas, tricks on the new Primo UI](https://docs.google.com/document/d/1pfhN1LZSuV6ZOZ7REldKYH7TR1Cc4BUzTMdNHwH5Bkc/edit#heading=h.frpduni5q4gd)


* [General documentation](https://github.com/ExLibrisGroup/primo-explore-package/blob/master/VIEW_CODE/README.md).
* [HTML documentation](https://github.com/ExLibrisGroup/primo-explore-package/blob/master/VIEW_CODE/html/README.md).
* [JavaScript documentation](https://github.com/ExLibrisGroup/primo-explore-package/blob/master/VIEW_CODE/js/README.md).
* [CSS documentation](https://github.com/ExLibrisGroup/primo-explore-package/blob/master/VIEW_CODE/js/README.md).
* [Images documentation](https://github.com/ExLibrisGroup/primo-explore-package/blob/master/VIEW_CODE/img/README.md).

### Inspiration

* https://github.com/Det-Kongelige-Bibliotek/primo-explore-rex
* https://github.com/SarahZum/primo-explore-custom-no-results

### Random notes


    angular.reloadWithDebugInfo();
    q = angular.element(document.getElementsByTagName('prm-search-bar-after'))
    q.scope().$ctrl


Modern Angular guide: (Note: currently we're at Angular 1.6)

https://toddmotto.com/angular-1-5-lifecycle-hooks

https://github.com/angular/angular.js/issues/14378

http://blog.kwintenp.com/the-onchanges-lifecycle-hook/

Watching changes in parent scope: `$onChanges` is generally not useful because
it's only called when the whole object is reassigned, there is no deep checking
for changes to elements inside the object. So in general we're left with
`$doCheck` and `$watch`. Both are evaluated at every digest cycle, so we have
to be careful about implementation to avoid degrading performance!

Suggested reading:

* [Component Lifecycle: $doCheck (angular 1.5.x)](http://www.kristofdegrave.be/2016/07/component-lifecycle-docheck-angular-15x_22.html)
* [Mastering $watch in AngularJS](https://www.sitepoint.com/mastering-watch-angularjs/)

