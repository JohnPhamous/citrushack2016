(function(){
    'use strict';

    /**
     * Create main app
     */

    angular.module('CitrusHack', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.showErrors', 'duScroll', 'angular-timeline', 'angular-scroll-animate','angular-loading-bar', 'sticky', 'CitrusHack.constants', 'CitrusHack.controllers', 'CitrusHack.directives', 'CitrusHack.services'])
        .value('duScrollOffset', 60)
        .run(['$rootScope', '$location', 'SCHOOLS', 'CLASS_LEVELS', 'APPLICANT_TYPES', 'TIMELINE_DAYS', function($rootScope, $location, SCHOOLS, CLASS_LEVELS, APPLICANT_TYPES, TIMELINE_DAYS) {
            // Make constants available
            $rootScope.SCHOOLS = SCHOOLS;
            $rootScope.CLASS_LEVELS = CLASS_LEVELS;
            $rootScope.APPLICANT_TYPES = APPLICANT_TYPES;
	    $rootScope.TIMELINE_DAYS = TIMELINE_DAYS;
            // Make location available in rootScope
            $rootScope.location = $location;
            // Make FB init available in rootScope
            $rootScope.FBInit = function () {
                FB.XFBML.parse();
            };

            // Flag for showing success registration modal
            $rootScope.successApply = false;
        }])
        // Configure angular-show-errors to also show
        // valid form entries
        .config(['showErrorsConfigProvider', function(showErrorsConfigProvider) {
          showErrorsConfigProvider.showSuccess(true);
        }]);

    angular.module('CitrusHack.constants', []);
    angular.module('CitrusHack.controllers', []);
    angular.module('CitrusHack.directives', []);
    angular.module('CitrusHack.services', []);
})();


(function(){
    'use strict';

    /**
     * Fetch main application
     */

    var app = angular.module('CitrusHack');

    /**
     * Sets states/urls
     */

    function setRoutes($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('live', {
                url: '/live',
                templateUrl: '../../partials/live.html',
                controller: 'LiveCtrl'
            })
            .state('main', {
                url: '/main'
              , templateUrl: '../../partials/main.html'
              , controller: 'MainCtrl'
            })
            .state('timeline', {
                url: '/schedule',
                templateUrl: '../../partials/schedule.html',
                controller: 'ScheduleCtrl'
            })
            .state('map', {
                url: '/map',
                templateUrl: '../../partials/map.html',
                controller: 'MapCtrl'
            })
            .state('prizes', {
                url: '/prizes',
                templateUrl: '../../partials/prizes.html',
                controller: 'PrizesCtrl'
            })
            .state('judging', {
                url: '/judging',
                templateUrl: '../../partials/judging.html',
                controller: 'JudgeCtrl'
            });

        // Go to home on unmatched route
        $urlRouterProvider.otherwise('/live');
    }

    /**
     * Configure app with route setter
     *
     * Angular dependancy injection
     *
     */

    app.config(['$stateProvider', '$urlRouterProvider', setRoutes]);

})();

(function() {
    'use strict';

    /**
     * Applicant types constant
     */

    var applicantTypes = ['Hacker', 'Hipster', 'Hustler'];

    /**
     * Register constant
     */

    angular.module('CitrusHack.constants')
        .constant('APPLICANT_TYPES', applicantTypes);
})();

(function(){
    'use strict';

    /**
     * Class levels constant
     */

    var classLevels = [ 'Freshman', 'Sophmore', 'Junior', 'Senior', 'Graduate' ];

    /**
     * Register constant
     */

    angular.module("CitrusHack.constants")
        .constant('CLASS_LEVELS', classLevels);
})();

(function(){
    'use strict';

    /**
     * Schools constant
     */

    var schools = [
        "Academy of Art University",
        "ITT Technical Institute-Rancho Cordova",
        "The Academy of Radio and TV Broadcasting",
        "Avalon School of Cosmetology-Alameda",
        "College of Alameda",
        "Allan Hancock College",
        "American Academy of Dramatic Arts-Los Angeles",
        "American Beauty College",
        "American Career College-Los Angeles",
        "American River College",
        "Everest College-Hayward",
        "Antelope Valley College",
        "Art Center College of Design",
        "Associated Technical College-Los Angeles",
        "Associated Technical College-San Diego",
        "Azusa Pacific University",
        "Bakersfield College",
        "Barstow Community College",
        "Bellus Academy-National City",
        "Bethesda University of California",
        "Biola University",
        "Brooks Institute",
        "Brownson Technical School",
        "Bryan University",
        "Butte College",
        "Cabrillo College",
        "California Baptist University",
        "California College of the Arts",
        "California Institute of Technology",
        "California Lutheran University",
        "California Polytechnic State University-San Luis Obispo",
        "Alliant International University",
        "California State University-Bakersfield",
        "California State University-Stanislaus",
        "California State University-San Bernardino",
        "California State Polytechnic University-Pomona",
        "California State University-Chico",
        "California State University-Dominguez Hills",
        "California State University-Fresno",
        "California State University-Fullerton",
        "California State University-East Bay",
        "California State University-Long Beach",
        "California State University-Los Angeles",
        "California State University-Northridge",
        "California State University-Sacramento",
        "University of California-Berkeley",
        "University of California-Davis",
        "University of California-Irvine",
        "University of California-Los Angeles",
        "University of California-Riverside",
        "University of California-San Diego",
        "University of California-Santa Barbara",
        "University of California-Santa Cruz",
        "California Beauty School",
        "California Christian College",
        "California College San Diego",
        "Le Cordon Bleu College of Culinary Arts-San Francisco",
        "California Hair Design Academy",
        "California Institute of the Arts",
        "California Maritime Academy",
        "Canada College",
        "College of the Canyons",
        "Career Academy of Beauty",
        "Casa Loma College-Van Nuys",
        "CET-San Diego",
        "CET-Sobrato",
        "CET-El Centro",
        "CET-San Bernardino",
        "CET-Watsonville",
        "CET-Gilroy",
        "CET-Salinas",
        "Cerritos College",
        "Cerro Coso Community College",
        "Chabot College",
        "Chaffey College",
        "Chapman University",
        "Charles R Drew University of Medicine and Science",
        "Concordia University-Irvine",
        "San Diego Christian College",
        "Citrus College",
        "Citrus Heights Beauty College",
        "City College of San Francisco",
        "Claremont McKenna College",
        "Milan Institute-Visalia",
        "Clovis Adult Education",
        "Coastline Community College",
        "Cogswell College",
        "Coleman University",
        "COBA Academy",
        "Columbia College",
        "Columbia College-Hollywood",
        "El Camino College-Compton Center",
        "Western Beauty Institute",
        "Contra Costa College",
        "Cosumnes River College",
        "Crafton Hills College",
        "Cuesta College",
        "Cuyamaca College",
        "Cypress College",
        "De Anza College",
        "Marinello Schools of Beauty-Hemet",
        "International School of Beauty Inc",
        "Dell'Arte International School of Physical Theatre",
        "College of the Desert",
        "Design Institute of San Diego",
        "Diablo Valley College",
        "Dominican University of California",
        "East Los Angeles College",
        "Marinello Schools of Beauty-Santa Clara",
        "El Camino Community College District",
        "Elegance International",
        "Marinello Schools of Beauty-Burbank",
        "Marinello Schools of Beauty-Moreno Valley",
        "Empire College School of Business",
        "Evergreen Valley College",
        "Fashion Institute of Design & Merchandising-Los Angeles",
        "Fashion Institute of Design & Merchandising-San Francisco",
        "Fashion Institute of Design & Merchandising-Orange County",
        "Feather River Community College District",
        "Federico Beauty Institute",
        "Hair California Beauty Academy",
        "Foothill College",
        "Fredrick and Charles Beauty College",
        "Fresno City College",
        "Fresno Pacific University",
        "Fullerton College",
        "Gavilan College",
        "Gemological Institute of America-Carlsbad",
        "Glendale Community College",
        "Glendale Career College",
        "Golden Gate University-San Francisco",
        "Golden West College",
        "Grossmont College",
        "Salon Success Academy-San Bernardino",
        "Hartnell College",
        "Harvey Mudd College",
        "Heald College-Rancho Cordova",
        "Heald College-Fresno",
        "Heald College-San Jose",
        "Heald College-San Francisco",
        "Heald College-Concord",
        "Hilltop Beauty School",
        "Holy Names University",
        "Humboldt State University",
        "Humphreys College-Stockton and Modesto Campuses",
        "Imperial Valley College",
        "Institute for Business and Technology",
        "Toni & Guy Hairdressing Academy-Santa Monica",
        "Irvine Valley College",
        "ITT Technical Institute-National City",
        "ITT Technical Institute-San Dimas",
        "ITT Technical Institute-Orange",
        "Bellus Academy-El Cajon",
        "Joe Blasco Makeup Artist Training Center",
        "American Jewish University",
        "Reedley College",
        "Life Pacific College",
        "The Art Institute of California-Argosy University San Diego",
        "University of La Verne",
        "Laguna College of Art and Design",
        "Lake Tahoe Community College",
        "Lancaster Beauty School",
        "Laney College",
        "Lassen Community College",
        "Lincoln University",
        "Southern California Seminary",
        "La Sierra University",
        "Long Beach City College",
        "Los Angeles Harbor College",
        "Los Angeles Pierce College",
        "Los Angeles Southwest College",
        "Los Angeles Trade Technical College",
        "Los Angeles Valley College",
        "The Master's College and Seminary",
        "Los Angeles City College",
        "Los Angeles Mission College",
        "Los Medanos College",
        "The Art Institute of California-Argosy University San Francisco",
        "Loyola Marymount University",
        "Lu Ross Academy",
        "Manchester Beauty College",
        "Tulare Beauty College",
        "Lyles Bakersfield College of Beauty",
        "Lyles Fresno College of Beauty",
        "Lytles Redwood Empire Beauty College Inc",
        "MTI Business College Inc",
        "MTI College",
        "Kaplan College-Sacramento",
        "Kaplan College-San Diego",
        "Kaplan College-Vista",
        "College of Marin",
        "Marinello Schools of Beauty-Los Angeles",
        "Marymount California University",
        "Mendocino College",
        "Menlo College",
        "Merced College",
        "Merritt College",
        "Mills College",
        "MiraCosta College",
        "Marinello Schools of Beauty-San Francisco",
        "Mission College",
        "Modern Beauty Academy",
        "Kaplan College-North Hollywood",
        "Modesto Junior College",
        "Moler Barber College",
        "Monterey Peninsula College",
        "Moorpark College",
        "Mt San Antonio College",
        "Mount St Mary's College",
        "Mt San Jacinto Community College District",
        "Mueller College",
        "Musicians Institute",
        "Napa Valley College",
        "Everest College-San Francisco",
        "Everest College-Reseda",
        "Everest College-LA Wilshire",
        "Everest College-San Jose",
        "Everest College-Gardena",
        "Everest College-Alhambra",
        "Everest College-San Bernardino",
        "The National Hispanic University",
        "National Holistic Institute",
        "National University",
        "Newschool of Architecture and Design",
        "Newberry School of Beauty",
        "Adrian's College of Beauty Modesto",
        "North-West College-Pomona",
        "North-West College-West Covina",
        "North-West College-Pasadena",
        "Northwestern Polytechnic University",
        "Notre Dame de Namur University",
        "Occidental College",
        "Oceanside College of Beauty",
        "Ohlone College",
        "Orange Coast College",
        "Otis College of Art and Design",
        "Oxnard College",
        "Hope International University",
        "Concorde Career College-San Diego",
        "Pacific States University",
        "Pacific Union College",
        "University of the Pacific",
        "Palo Verde College",
        "Palomar College",
        "Paris Beauty College",
        "Pasadena City College",
        "Pepperdine University",
        "Pitzer College",
        "Platt College-San Diego",
        "Point Loma Nazarene University",
        "Pomona College",
        "Porterville College",
        "Westwood College-South Bay",
        "Professional Institute of Beauty",
        "Santa Ana College",
        "Shasta School of Cosmetology",
        "University of Redlands",
        "College of the Redwoods",
        "Salon Success Academy-Upland",
        "Salon Success Academy-Corona",
        "Rio Hondo College",
        "Riverside City College",
        "Argosy University-San Francisco Bay Area",
        "Rosemead Beauty School",
        "Sacramento City College",
        "Saddleback College",
        "San Diego City College",
        "Golf Academy of America-Carlsbad",
        "San Diego Mesa College",
        "San Diego Miramar College",
        "San Diego State University",
        "University of San Diego",
        "San Francisco Art Institute",
        "San Francisco Conservatory of Music",
        "San Francisco State University",
        "University of San Francisco",
        "San Joaquin Delta College",
        "San Joaquin Valley College-Visalia",
        "San Joaquin Valley College-Bakersfield",
        "William Jessup University",
        "San Jose City College",
        "San Jose State University",
        "College of San Mateo",
        "Santa Barbara Business College-Bakersfield",
        "Westwood College-Los Angeles",
        "Santa Barbara Business College-Santa Maria",
        "Santa Barbara City College",
        "Santa Clara University",
        "Santa Monica College",
        "Santa Rosa Junior College",
        "Scripps College",
        "Wyotech-Fremont",
        "College of the Sequoias",
        "Shasta Bible College and Graduate School",
        "Shasta College",
        "Sierra College",
        "Sierra College of Beauty",
        "Sierra Valley College of Court Reporting",
        "Simpson University",
        "College of the Siskiyous",
        "Charles A Jones Career and Education Center",
        "Skyline College",
        "San Bernardino Valley College",
        "Saint Mary's College of California",
        "Solano Community College",
        "Sonoma State University",
        "Pinnacle College",
        "South Coast College",
        "Vanguard University of Southern California",
        "Concorde Career College-Garden Grove",
        "Southwestern College",
        "Southern California Institute of Architecture",
        "University of Southern California",
        "Taft College",
        "Thomas Aquinas College",
        "Marinello Schools of Beauty-Lake Forest",
        "Epic Bible College",
        "United Education Institute-Huntington Park Campus",
        "Concorde Career College-San Bernardino",
        "Universal College of Beauty Inc-Los Angeles 1",
        "Concorde Career College-North Hollywood",
        "Ventura College",
        "Victor Valley Beauty College Inc",
        "Victor Valley College",
        "Berkeley City College",
        "Waynes College of Beauty",
        "West Hills College-Coalinga",
        "West Los Angeles College",
        "West Valley College",
        "Carrington College California-Sacramento",
        "Westmont College",
        "Whittier College",
        "Woodbury University",
        "Yeshiva Ohr Elchonon Chabad West Coast Talmudical Seminary",
        "Yuba College",
        "Stanford University",
        "ITT Technical Institute-Sylmar",
        "Carrington College California-San Leandro",
        "Fashion Institute of Design & Merchandising-San Diego",
        "Platt College-Los Angeles",
        "Brandman University",
        "Adrian's College of Beauty Turlock",
        "California Career School",
        "San Joaquin Valley College-Fresno",
        "Heald College-Roseville",
        "Palomar Institute of Cosmetology",
        "InterCoast Colleges-Orange",
        "Las Positas College",
        "California State University-San Marcos",
        "Kaplan College-Modesto",
        "Madera Beauty College",
        "Hypnosis Motivation Institute",
        "Los Angeles ORT College-Los Angeles Campus",
        "Everest College-West Los Angeles",
        "Thanh Le College School of Cosmetology",
        "Everest College-Ontario",
        "Downey Adult School",
        "Heald College-Stockton",
        "Heald College-Hayward",
        "CRU Institute",
        "Modern Technology School",
        "National Career Education",
        "Everest College-Anaheim",
        "Thuy Princess Beauty College",
        "North-West College-Glendale",
        "Everest College-City of Industry",
        "Fremont College",
        "Pomona Unified School District Adult and Career Education",
        "University of Phoenix-San Diego Campus",
        "Universal College of Beauty Inc-Los Angeles 2",
        "Bellus Academy-Poway",
        "Capstone College",
        "Central Coast College",
        "ITT Technical Institute-Torrance",
        "Pacific College of Oriental Medicine-San Diego",
        "CET-Coachella",
        "CET-Oxnard",
        "CET-Santa Maria",
        "CET-Rancho Temecula",
        "ITT Technical Institute-San Bernardino",
        "Los Angeles ORT College-Van Nuys Campus",
        "Mt Diablo Adult Education",
        "Royale College of Beauty",
        "Westech College",
        "Hacienda La Puente Adult Education",
        "Alhambra Beauty College",
        "American Auto Institute",
        "Asian American International Beauty College",
        "Avance Beauty College",
        "Colton-Redlands-Yucaipa Regional Occupational Program",
        "Copper Mountain Community College",
        "Diversified Vocational College",
        "Bristol University",
        "UEI College-Fresno",
        "Mt Sierra College",
        "Wyotech-Long Beach",
        "Santiago Canyon College",
        "Southern California Institute of Technology",
        "Soka University of America",
        "Summit College",
        "Advance Beauty College",
        "Career Colleges of America",
        "World Mission University",
        "Coast Career Institute",
        "University of Phoenix-Bay Area Campus",
        "University of Phoenix-Southern California Campus",
        "California State University-Monterey Bay",
        "Heald College-Salinas",
        "The Art Institute of California-Argosy University Hollywood",
        "Sage College",
        "Marian Health Careers Center-Los Angeles Campus",
        "Anthem College-Sacramento",
        "Crimson Technical College",
        "East San Gabriel Valley Regional Occupational Program",
        "ITT Technical Institute-Oxnard",
        "Four-D College",
        "Premiere Career College",
        "Estes Institute of Cosmetology Arts and Science",
        "Baldwin Park Adult & Community Education",
        "Ventura Adult and Continuing Education",
        "Marinello Schools of Beauty-Sacramento",
        "Central California School",
        "University of Phoenix-Sacramento Valley Campus",
        "Colleen O'Haras Beauty Academy",
        "San Joaquin Valley College-Fresno Aviation",
        "Champion Institute of Cosmetology",
        "Pacific College",
        "American College of Healthcare",
        "Le Cordon Bleu College of Culinary Arts-Pasadena",
        "John Wesley International Barber and Beauty College",
        "CET-Sacramento",
        "Everest College-Torrance",
        "Institute of Technology Inc",
        "Virginia Sewing Machines and School Center",
        "Kaplan College-Riverside",
        "Platt College-Ontario",
        "The Art Institute of California-Argosy University Los Angeles",
        "American University of Health Sciences",
        "Career Networks Institute",
        "Santa Barbara Business College-Ventura",
        "Pima Medical Institute-Chula Vista",
        "Charter College-Canyon Country",
        "Los Angeles Film School",
        "Argosy University-Orange County",
        "ITT Technical Institute-Lathrop",
        "The English Center",
        "ICDC College",
        "Professional Golfers Career College",
        "Westwood College-Anaheim",
        "InterCoast Colleges-Burbank",
        "Carrington College California-Antioch",
        "Carrington College California-San Jose",
        "Carrington College California-Pleasant Hill",
        "Universal Technical Institute of California Inc",
        "CBD College",
        "King's University",
        "My Le's Beauty College",
        "Bryan College-Gold River",
        "PCI College",
        "American Career College at St Francis",
        "Everest College-Ontario Metro",
        "Westwood College-Inland Empire",
        "Miami Ad School-San Francisco",
        "American Career College-Anaheim",
        "San Diego State University-Imperial Valley Campus",
        "West Coast Ultrasound Institute",
        "Design's School of Cosmetology",
        "Paul Mitchell the School-Santa Barbara",
        "California State University-Channel Islands",
        "The Art Institute of California-Argosy University Orange County",
        "David's Academy of Beauty",
        "Paul Mitchell the School-Costa Mesa",
        "San Joaquin Valley College-Ontario",
        "Milan Institute-Palm Desert",
        "InterCoast Colleges-Riverside",
        "University of Antelope Valley",
        "California Healing Arts College",
        "NTMA Training Centers of Southern California",
        "West Coast University-Los Angeles",
        "California College of Vocational Careers",
        "InterCoast Colleges-West Covina",
        "Folsom Lake College",
        "ATI College-Norwalk",
        "Advanced College",
        "Advanced Training Associates",
        "CES College",
        "Computer Tutor Business and Technical Institute",
        "University of California-Merced",
        "North-West College-Riverside",
        "Wyotech-West Sacramento",
        "University of Phoenix-Central Valley Campus",
        "Cambridge Junior College-Yuba City",
        "Career Care Institute",
        "Community Christian College",
        "Los Angeles Music Academy",
        "Pacific Coast Trade School",
        "Stanbridge College",
        "United States University",
        "Kaplan College-Bakersfield",
        "Kaplan College-Fresno",
        "Argosy University-Los Angeles",
        "San Joaquin Valley College-Modesto",
        "Expression College for Digital Arts",
        "Kaplan College-Palm Springs",
        "Palladium Technical Academy",
        "Palace Beauty College",
        "National Polytechnic College",
        "American Career College-Ontario",
        "Asher College",
        "American Institute of Massage Therapy",
        "Blake Austin College",
        "SUM Bible College and Theological Seminary",
        "San Joaquin Valley College-Rancho Cordova",
        "Universal Technical Institute of Northern California Inc",
        "ITT Technical Institute-Clovis",
        "The Art Institute of California-Argosy University Inland Empire",
        "West Hills College-Lemoore",
        "Milan Institute-Clovis",
        "Beaumont Adult School",
        "Make-up Designory",
        "Video Symphony EnterTraining Inc",
        "Gnomon School of Visual Effects",
        "Coachella Valley Beauty College",
        "Career College of California",
        "Valley College of Medical Careers",
        "University of the West",
        "Paul Mitchell the School-San Diego",
        "Paul Mitchell the School-Sherman Oaks",
        "The Art Institute of California-Argosy University Sacramento",
        "International Academy of Design and Technology-Sacramento",
        "Argosy University-Inland Empire",
        "Argosy University-San Diego",
        "InterCoast Colleges-Carson",
        "Carrington College California-Stockton",
        "Carrington College California-Citrus Heights",
        "InfoTech Career College",
        "Trident University International",
        "Coastline Beauty College",
        "Career College Consultants",
        "San Diego College",
        "The Art Institute of California-Argosy University-Silicon Valley",
        "Le Cordon Bleu College of Culinary Arts-Sacramento",
        "Milan Institute of Cosmetology-Fairfield",
        "Milan Institute of Cosmetology-Visalia",
        "Taft University System",
        "Mayfield College",
        "International Polytechnic Institute",
        "Academy of Esthetics and Cosmetology",
        "BioHealth College",
        "International Professional School of Bodywork",
        "Borner's Barber College",
        "Paul Mitchell the School-Pasadena",
        "San Francisco Institute of Esthetics and Cosmetology",
        "Laurus College",
        "Healing Hands School of Holistic Health",
        "Career Development Institute",
        "California InterContinental University",
        "Woodland Community College",
        "California Nurses Educational Institute",
        "Central Nursing College",
        "RWM Fiber Optics",
        "Paul Mitchell the School-Sacramento",
        "Providence Christian College",
        "National Career College",
        "ITT Technical Institute-Concord",
        "Salon Success Academy-Fontana",
        "Salon Success Academy-Redlands",
        "San Joaquin Valley College-Hesperia",
        "Milan Institute-Bakersfield",
        "Homestead Schools",
        "InterCoast Colleges-Elk Grove",
        "Horizon University",
        "San Diego Culinary Institute",
        "Beyond 21st Century Beauty Academy",
        "Hollywood Beauty College",
        "Angeles College",
        "Angeles Institute",
        "Paul Mitchell the School-Temecula",
        "Kaplan College-Chula Vista",
        "InterCoast Colleges-Roseville",
        "West Coast University-Orange County",
        "West Coast University-Ontario",
        "Northern California Institute of Cosmetology Inc",
        "Golden State College of Court Reporting",
        "Preferred College of Nursing-Los Angeles",
        "Trinity Vocational Center",
        "SICE Paul Mitchell Partner School",
        "Cosmo Beauty Academy",
        "Paul Mitchell the School-Fresno",
        "Unitek College",
        "Gurnick Academy of Medical Arts",
        "Paul Mitchell the School-East Bay",
        "ITT Technical Institute-Corona",
        "ITT Technical Institute-West Covina",
        "ITT Technical Institute-Culver City",
        "Touro University Worldwide",
        "Heald College-Modesto",
        "California University of Management and Sciences",
        "Everest College-Santa Ana",
        "Moreno Valley College",
        "Norco College",
        "Milan Institute of Cosmetology-La Quinta",
        "Cambridge Junior College-Woodland",
        "Western Beauty Institute",
        "Allied American University",
        "New York Film Academy",
        "International College of Cosmetology",
        "Toni & Guy Hairdressing Academy-Modesto",
        "Galaxy Medical College",
        "American Medical Sciences Center",
        "Tramy Beauty School",
        "Santa Ana Beauty Academy",
        "Elite Cosmetology School",
        "Twin Rivers Adult School",
        "Real Barbers College",
        "Ashdown College of Health Sciences",
        "Cinta Aveda Institute",
        "Southern California Health Institute",
        "Salinas Beauty College Inc",
        "Academy for Salon Professionals",
        "Academy for Salon Professionals",
        "International College of Beauty Arts & Sciences",
        "John Paul the Great Catholic University",
        "ITT Technical Institute-Oakland",
        "Carrington College California-Pomona",
        "CET-Soledad",
        "Aveda Institute-Los Angeles",
        "Coast Career Institute",
        "Azusa Pacific Online University",
        "International Culinary Center-California",
        "San Joaquin Valley College-Temecula",
        "The University of America",
        "Marian Health Careers Center-Van Nuys Campus",
        "MediaTech Institute-Oceanside",
        "Academy of Couture Art",
        "Preferred College of Nursing-Van Nuys",
        "Annenberg School of Nursing",
        "WestMed College",
        "Flair Beauty College",
        "Medical Allied Career Center",
        "LeMelange Academy of Hair",
        "Diamond Beauty College",
        "SAE Institute of Technology-Los Angeles",
        "California College San Diego",
        "California College San Diego",
        "Advance Beauty Techs Academy",
        "Brand College",
        "Hinton Barber College",
        "Advanced Career Institute",
        "Platt College-Riverside",
        "Abraham Lincoln University",
        "California Miramar University",
        "UEI College-Santa Cruz",
        "Grace Mission University",
        "Santa Ana Beauty College",
        "Ukiah Adult School",
        "Riverside County Office of Education",
        "Advanced Computing Institute",
        "Xavier College School of Nursing",
        "Lawrence & Company College of Cosmetology",
        "California Career Institute",
        "Cosmo Factory Cosmetology Academy",
        "W Academy of Salon and Spa",
        "Toni & Guy Hairdressing Academy-Manteca",
        "San Joaquin Valley College-Lancaster",
        "San Joaquin Valley College-San Diego",
        "American Career College-Long Beach",
        "InterCoast Colleges-Fairfield",
        "Milan Institute-Merced",
        "DeVry University-California",
        "American College of Healthcare"
    ];

    /**
     * Register constant
     */

    angular.module('CitrusHack.constants')
        .constant('SCHOOLS', schools.sort());
})();

(function() {
    'use strict';

    /**
     * Schedule days
     */

    var friday=[{
	badgeClass: 'succes',
	badgeIconClass: 'glyphicon-th-list',
	title: 'Check In!',
	content: '5:00 PM - 7:00 PM @ Bytes Patio'
    },{
	badgeClass: 'warning',
	badgeIconClass: 'glyphicon-cutlery',
	title: 'Dinner',
	content: '7:00 PM - 8:00 PM @ Bytes Patio.'
    },{
	badgeClass: 'success',
	badgeIconClass: 'glyphicon-star',
	title: 'Opening Ceremony',
	content: '8:00 PM - 9:00 PM @ UNLH'
    },{
	badgeClass: 'success',
	badgeIconClass: 'glyphicon-flash',
	title: 'HACKING BEGINS!',
	content: '9:00 PM @ BCOE',
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-education',
	title: 'Github Workhop',
	content: '10:00 PM - 11:00 PM @ WCH 205'
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-education',
	title: 'Game Development Workshop',
	content: '11:00 PM - 12:00 AM @ WCH 205'
    }];

    var saturday=[{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-education',
	title: 'Sharpen Your Skills Workshop',
	content: '3:00 AM - 4:00 AM @ WCH 205'
    },{
	badgeClass: 'warning',
	badgeIconClass: 'glyphicon-cutlery',
	title: 'Breakfast',
	content: '8:00 AM - 9:00 AM @ Bytes'
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-education',
	title: 'Ruby on Rails Workshop',
	content: '9:00 AM - 10:00 AM @ WCH 205'
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-education',
	title: 'Node-RED Talk',
	content: '10:00 AM - 11:00 AM @ WCH 205'
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-bullhorn',
	title: 'Denis "The YESMAN" Nurmela Talk',
	content: '12:00 PM - 1:00 PM'
    },{
	badgeClass: 'warning',
	badgeIconClass: 'glyphicon-cutlery',
	title: 'Lunch!',
	content: '1:00 PM - 2:00 PM @ Bytes',
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-flag',
	title: 'MLH Capture The Flag',
	content: '4:00 PM - 5:00 PM @ A265',
    },{
	badgeClass: 'warning',
	badgeIconClass: 'glyphicon-cutlery',
	title: 'Dinner',
	content: '6:00 PM - 7:00 PM @ Bytes'
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-glass',
	title: 'MLH Cupstacking Tournament',
	content: '10:00 PM - 11:00 PM @ Bytes'
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-road',
	title: 'Pokemon GO UCR Tour',
	content: '11:00 PM - 12:00 AM @ Bytes',
    }];

    var sunday=[{
	badgeClass: 'danger',
	badgeIconClass: 'glyphicon-exclamation-sign',
	title: 'Hacking Ends!!!',
	content: '9:00 AM'
    },{
	badgeClass: 'warning',
	badgeIconClass: 'glyphicon-cutlery',
	title: 'Breakfast',
	content: '9:00 AM - 10:00 AM @ Bytes'
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-eye-open',
	title: 'Expo Demos',
	content: '10:00 AM - 12:00 PM @ WCH Courtyard'
    },{
	badgeClass: 'warning',
	badgeIconClass: 'glyphicon-cutlery',
	title: 'Lunch',
	content: '12:00 PM - 1:00 PM @ Bytes',
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-user',
	title: 'Closing Ceremony',
	content: '1:00 PM - 3:00 PM @ UNLH'
    },{
	badgeClass: 'info',
	badgeIconClass: 'glyphicon-plane',
	title: 'Pack Up and Begin Leaving',
	content: '3:00 PM'
    },{
	badgeClass: 'success',
	badgeIconClass: 'glyphicon-time',
	title: 'Official Event End',
	content: '4:00 PM'
    }];

    angular.module('CitrusHack.constants')
	.constant('TIMELINE_DAYS', {friday, saturday, sunday});
})();


















(function(){
    'use strict';

    /**
     * Apply controller
     */

    function applyCtrl ($scope, $rootScope, $modal, $document, $location, Application) {
        // Name of the view
        $scope.pageView = 'apply-view';
        // Reason for needing a phone number
        $scope.phoneNeededReason = 'In case of an emergency or we need ' +
                                   'to otherwise reach you quickly during ' +
                                   'the event';
        // Reason for needing age
        $scope.ageNeededReason = 'Since this is an overnight event, You must ' +
                                 'be 16 or older to participate. If you are ' +
                                 'under 18, we will have to send you a ' +
                                 'liability waiver for you to sign. :)';

        // Details about transportation
        $scope.transDetail = 'We will be providing transportation for a select ' +
                             'number of schools. This will help us figure out ' +
                             'which schools have the most need';

        // Details about code of conduct
        $scope.cocDetails = 'The MLH Code of Conduct is the set of rules and ' +
                            'behaviours that must be adhered to at our event. ' +
                            'It is very important you take the time to read ' +
                            'through and understand. If you have any ' +
                            'questions, you can reach out to us or MLH ' +
                            'at any time.';

        // Bind application model to scope
        $scope.Application = Application;

        // Initialize Diet values
        $scope.Application.Diet['Vegan'] = 'no';
        $scope.Application.Diet['Vegetarian'] = 'no';
        $scope.Application.Diet['Lactose Intolerant'] = 'no';
        $scope.Application.Diet['Gluten-Free'] = 'no';
        $scope.Application.Diet['Other'] = '';

        // Send button state
        $scope.submitting = false;


        // Form submission
        $scope.submit = function () {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.applyForm.$valid) {
                $scope.submitting = true;
                // Send application
                Application.sendApplication()
                    // Success
                    .then(function(){
                        $rootScope.successApply = true;
                        $modal.open({
                            templateUrl: 'partials/successAppModal.html'
                          , controller: 'SuccessAppModalCtrl'
                          , size: 'md'
                        });
                    }, function(){
                        $modal.open({
                            templateUrl: 'partials/errorEmailAppModal.html'
                          , controller: 'ErrorEmailAppModalCtrl'
                          , size: 'md'
                        });
                    })
                    .finally(function(){
                        $scope.submitting = false;
                    });
            }
            // There was an error in the form
            else {
                // Focus on the first invalid field
                var applyFormElem       = angular.element('[name="applyForm"]')
                  , firstErrorInputElem = applyFormElem.find('.has-error').first()
                  , documentElem        = angular.element($document);

                documentElem.scrollToElementAnimated(firstErrorInputElem, 10);
            }
        };
    }

    /**
     * Register controller
     */

    angular.module('CitrusHack.controllers')
        .controller('ApplyCtrl', ['$scope', '$rootScope', '$modal', '$document', '$location', 'Application', applyCtrl]);

})();

(function(){
    'use strict';

    /**
     * Error email app modal controller
     */

     function errorEmailAppModalCtrl ($scope, $modalInstance) {
        // Close modal
        $scope.close = function () {
            $modalInstance.close();
        };
     }

     /**
      * Register controller
      */

     angular.module('CitrusHack.controllers')
        .controller('ErrorEmailAppModalCtrl', ['$scope', '$modalInstance', errorEmailAppModalCtrl]);
})();

(function(){
    'use strict';

    /**
     * Judging View controller
     */

     function judgeCtrl ($scope) {
         // Name of the view
         $scope.pageView = 'judging-view';
     }

     /**
      * Register controller
      */

     angular.module('CitrusHack.controllers')
         .controller('JudgeCtrl', ['$scope', judgeCtrl])

})();

(function(){
 'use strict';

 /**
  * Live controller
  */

 function liveCtrl ($scope) {
 // Name of the view
    $scope.pageView = 'live-view';
 }

 /**
  * Register controller
  */

 angular.module('CitrusHack.controllers')
    .controller('LiveCtrl', ['$scope', liveCtrl]);

})();

(function(){
    'use strict';

    /**
     * Main controller
     */

    function mainCtrl ($scope, $rootScope, $modal, Contact) {
        // Name of the view
        $scope.pageView = 'main-view';
        // Security breach elaboration
        $scope.securityElaborate = 'Although your project could be security related';
        // Project ideas explanation
        $scope.projectIdeasType = 'These projects would be a mix of humanitarian and utility applications';
        // Bind contact
        $scope.Contact = Contact;
        // See if we have sent the contact form
        $scope.sentForm = false;

	$scope.animateElementIn=function($el) {
	  $el.removeClass('invisible');
	  $el.addClass('bounce-in');
	};

	$scope.animateElementOut=function($el) {
	  $el.addClass('invisible');
	  $el.removeClass('bounce-in');
	};

        // Send contact form
        $scope.sendMessage = function () {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.contactForm.$valid) {
                // Send the form
                Contact.sendMessage()
                    .finally(function(){
                        $scope.sentForm = true;
                    });
            }
        };
    }

    /**
     * Register controller
     */

    angular.module('CitrusHack.controllers')
        .controller('MainCtrl', ['$scope', '$rootScope', '$modal', 'Contact', mainCtrl]);

})();

(function(){
    'use strict';

    /**
     * Map View controller
     */

     function mapCtrl ($scope) {
         // Name of the view
         $scope.pageView = 'map-view';
     }

     /**
      * Register controller
      */

     angular.module('CitrusHack.controllers')
         .controller('MapCtrl', ['$scope', mapCtrl])

})();

(function(){
    'use strict';

    /**
     * Prizes controller
     */

    function prizeCtrl ($scope) {
        // Name of the view
        $scope.pageView = 'prizes-view';
    }

    /**
     * Register controller
     */

    angular.module('CitrusHack.controllers')
        .controller('PrizesCtrl', ['$scope', prizeCtrl]);

})();

(function(){
 'use strict';

 /**
  * Timeline controller
  */

 function scheduleCtrl ($scope, $rootScope) {
    // Name of the view
    $scope.pageView = 'timeline-view';
 }

 angular.module('CitrusHack.controllers')
    .controller('ScheduleCtrl', ['$scope', '$rootScope', scheduleCtrl]);
})();

(function(){
    'use strict';

    /**
     * Success app modal controller
     */

     function successAppModalCtrl ($scope, $modalInstance, $location) {
        // Close modal
        $scope.close = function () {
            $modalInstance.close();
            $location.url('/main');
        };
     }

     /**
      * Register controller
      */

     angular.module('CitrusHack.controllers')
        .controller('SuccessAppModalCtrl', ['$scope', '$modalInstance', '$location', successAppModalCtrl]);
})();

(function(){
    'use strict';

    /**
     * Parallax scrolling directive
     */

    function parallax ($window){

        /**
         * Directive syntax
         */

        return function (scope, element, attrs) {
            var posY = 0
              , posX = 0
              , speed = attrs.chParallaxSpeed || 5;

            var windowEl = angular.element($window);

            // Ensure element has background properties
            element.css({
                backgroundPosition: posX + 'px ' + posY + 'px'
              , backgroundSize: 'cover'
              , backgroundRepeat: 'no-repeat'
              , backgroundAttachment: 'fixed'
            });

            // Update position function
            function updateY () {
                var offset       = element.offset().top
                  , height       = element.outerHeight()
                  , scrollTop    = windowEl.scrollTop()
                  , windowHeight = windowEl.height();

                if (offset + height <= scrollTop || offset >= scrollTop + windowHeight)
                    return;

                posY = Math.round((offset - scrollTop) / speed);

                element.css({
                    backgroundPosition: posX + 'px ' + posY + 'px'
                });
            }

            // Activate directive only if window is at least
            // col-md width
            if (windowEl.width() >= 992)
            {
                windowEl.on('scroll', updateY);
            }

            // Clean up
            element.on('destroy', function (){
                windowEl.off('scroll', updateY);
            });
        };
    }

    /**
     * Register directive
     */

    angular.module('CitrusHack.directives')
        .directive('chParallax', ['$window', parallax]);

})();


(function(){
    'use strict';

    // Directive to make file input work
    // Adapted from http://stackoverflow.com/questions/18383446/how-to-validate-form-with-inputtype-file-in-angularjs

    function resumeUpload (){
        
        /**
         * Directive syntax
         */

        return {
            restrict: 'A'
          , require: '^ngModel'
          , scope: {
                Application: '@'
            }
          , link: function (scope, element, attrs, ngModel){
                    ngModel.$render = function (value) {
                        ngModel.$setViewValue(value);
                    };
                    
                    //change event is fired when file is selected
                    element.bind('change',function(event){
                        scope.$apply(function(){
                            // Bind file to scope if it exists
                            if (event.target.files && event.target.files.length >= 1){
                                ngModel.Resume = event.target.files[0];
                            }
                            ngModel.$render(event.target.files[0]);
                        });
                    });
                 }
        };
    } 

    /**
     * Register directive
     */

    angular.module('CitrusHack.directives')
        .directive('resumeUpload', resumeUpload);

})();

(function () {
    'use strict';

    /**
     * Application factory
     */

    function applicationFactory ($http, $q){

        /**
         * Application object
         */

        function application () {

            // Only value properties should
            // be here
            this.Fname    = '';
            this.Lname    = '';
            this.Gender   = '';
            this.Email    = '';
            this.First    = '';
            this.School   = '';
            this.ClassLvl = '';
            this.Type     = '';
            this.Ride     = '';
            this.Diet     = {};
            this.Phone    = '';
            this.Age      = 0;
            this.TShirt   = '';
            this.Github   = '';
            this.Hardware = '';
            this.MLH      = '';
            this.Resume   = undefined;
        }

        application.prototype.sendApplication = function () {
            var deferred = $q.defer();

            $http({
                method: 'POST'
              , url: '/apply.php'
              , headers: {'Content-Type': undefined}
              , data: { scope: this, file: this.Resume }
              , transformRequest: function (data){
                    var formData = new FormData();
                    // Append Resume file to formData
                    formData.append("Resume", data.file);
                    // Append scope to formData
                    formData.append("Scope", JSON.stringify(data.scope));
                    return formData;
                }
            })
            .success(function(){
                deferred.resolve();
            })
            .error(function(){
                deferred.reject();
            });

            return deferred.promise;
        };

        return new application ();
    }

    /**
     * Register factory
     */

    angular.module('CitrusHack.services')
        .factory('Application', ['$http', '$q', applicationFactory]);

})();


(function() {
    'use strict';

    /**
     * Contact factory
     */

    function contactFactory ($http, $q){

        /**
         * Contact object
         */

        function contact () {
            this.Email = '';
            this.Subject = '';
            this.Message = '';
        }

        contact.prototype.sendMessage = function () {
            var deferred = $q.defer();

            $http({
                method: 'POST'
              , url: '/mail.php'
              , data: JSON.stringify(this)
            })
            .success(function(){
                deferred.resolve();
            })
            .error(function(){
                deferred.reject();
            });

            return deferred.promise;
        };

        return new contact ();
    }

    /**
     * Register factory
     */

    angular.module('CitrusHack.services')
        .factory('Contact', ['$http', '$q', contactFactory]);

})();

