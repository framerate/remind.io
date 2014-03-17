'use strict';
/*
SECRET COW LEVEL - HTML5 Gruntfile Configuration
Author: justin@secretcowlevel.com
Date: 11.08.2013
Updated: 02.26.14 - Redid framework (express + watch instead of concurrent + nodemon)
 */

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig(
    {
        // Give Grunt access to the package.json file info
        'pkg': grunt.file.readJSON('package.json'),

        // this will uglify/minify/concat our files
        'uglify':
        {
            'scl':
            {
                'src': ['lib/client/js/*.js'],
                'dest': 'static/js/scl.min.js',
                'options': {
                    'mangle': false,
                    'compress': false,
                    'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                }
            },
            'vendor':
            {
                'src': [
                    'lib/client/vendor/js/jquery.js',
                    'lib/client/vendor/js/bootstrap.js',
                    'lib/client/vendor/js/signet.js',
                ],
                'dest': 'static/js/vendor.min.js',
                'options': {
                    'mangle': false,
                    'compress': false,
                    'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - thirdparty requirements - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                }
            }
        },

        // We use this to make sure our JS files follow our spec
        'jshint':
        {
            'server':
            {
                'src': ['./*.js', 'lib/*.js'],
                'options':
                {
                    'jshintrc': true,
                    'ignores': 'newrelic.js'
                }
            },
            'client':
            {
                'src': ['lib/client/js/*'],
                'options':
                {
                    'jshintrc': true,
                    'ignores': 'newrelic.js'
                }
            }
        },

        // Watch for changes to trigger events
        'watch': {
            // 'everything': {
            //     'files': ['*.js', 'lib/**/*.js', 'lib/**/*.css', 'lib/client/js/*.js', 'views/*.ejs'],
            //     'tasks': [ 'default'],
            //     'options': {
            //         'spawn': false
            //     }
            // },
            'frontEnd': {
                'files': ['lib/client/js/*.js', 'lib/client/css/*.css'],
                'tasks': ['frontEnd'],
                'options': {
                    'spawn': false
                }
            },
            'backEnd': {
                'files': ['*.js', 'views/*.ejs', 'lib/*.js'],
                'tasks': ['backEnd'],
                'options': {
                    'spawn': false
                }
            }
        },

        'express': {
            'options': {
                // Override defaults here
                'port': 8080,
                'background': true,
                'node_env': 'development'
            },
            'dev': {
                'options': {
                    'script': 'app.js'
                }
            }
        },

        'bower': {
            'dev': {
                'dest': 'lib/client/vendor',
                'js_dest': 'lib/client/vendor/js',
                'css_dest': 'lib/client/vendor/css',
                'options': {
                    'packageSpecific':
                    {
                        'bootstrap': {
                            'files': [
                                'dist/css/bootstrap.css'
                            ]
                        },
                        'font-awesome': {
                            'files': [
                                'css/font-awesome.css',
                                'fonts/fontawesome-webfont.eot',
                                'fonts/fontawesome-webfont.svg',
                                'fonts/fontawesome-webfont.ttf',
                                'fonts/fontawesome-webfont.woff'
                            ],
                            'dest': 'static/fonts/'
                        }
                    }
                }
            }
        },

        'cssmin': {
            'add_banner': {
                'options': {
                    'banner': '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                'files': {
                    'static/css/scl.min.css': [
                        'lib/client/vendor/css/bootstrap.css',
                        'lib/client/vendor/css/font-awesome.css',
                        'lib/client/css/default.css'
                    ]
                }
            }
        },

        'jsbeautifier' : {
            'files' : ['app.js', 'lib/*.js', 'lib/client/*.js'],
            'options' : {
                'js': {
                    'braceStyle': 'end-expand',
                    'breakChainedMethods': false,
                    'e4x': false,
                    'evalCode': false,
                    'indentChar': ' ',
                    'indentLevel': 1,
                    'indentSize': 4,
                    'indentWithTabs': false,
                    'jslintHappy': false,
                    'keepArrayIndentation': false,
                    'keepFunctionIndentation': false,
                    'maxPreserveNewlines': 10,
                    'preserveNewlines': true,
                    'spaceBeforeConditional': true,
                    'spaceInParen': false,
                    'unescapeStrings': false,
                    'wrapLineLength': 80
                }
            }
        }
    });

    // Register the tasks to run
    grunt.registerTask('default', [ 'jshint', 'bower', 'uglify', 'cssmin', 'express:dev', 'watch' ]);
    grunt.registerTask('frontEnd', [ 'jshint', 'uglify', 'cssmin', 'watch' ]);
    grunt.registerTask('backEnd', [ 'jshint', 'bower', 'express:dev', 'watch' ]);
};
