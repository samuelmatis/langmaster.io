'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'lodash'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // grunt.loadNpmTasks('grunt-ucss');

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                    '<%= yeoman.app %>/scripts/templates/*.{ejs,mustache,hbs}'
                ]
            },
            jst: {
                files: [
                    '<%= yeoman.app %>/scripts/templates/*.ejs'
                ],
                tasks: ['jst']
            }
        },
        // ucss: {
        //     target: {
        //       pages: {
        //         crawl: 'http://localhost:5000'
        //       },
        //       css: ['<%= yeoman.app %>/dist/styles/{,*/}*.css']
        //     }
        //   },
        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        useminPrepare: {
            html: ['<%= yeoman.app %>/index.html','<%= yeoman.app %>/home.html'],
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/vendor.css': [ '<%= yeoman.app %>/styles/vendor/{,*/}*.css' ],
                    '<%= yeoman.dist %>/styles/main.css': [ '<%= yeoman.app %>/styles/app/{,*/}*.css' ],
                    '<%= yeoman.dist %>/styles/home.css': [ '<%= yeoman.app %>/styles/home/{,*/}*.css' ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'fonts/{,*/}*.*'
                    ]
                }]
            },

            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>',
                dest: '.tmp/',
                src: [
                  'styles/{,*/}*.css',
                  'bower_components/**/*.css'
                ]
            }
        },
        bower: {
            all: {
                rjsConfig: '<%= yeoman.app %>/scripts/main.js'
            }
        },
        jst: {
            compile: {
                files: {
                    '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        } else if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'createDefaultTemplate',
                'jst',
                'connect:test:keepalive'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'createDefaultTemplate',
            'jst',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'createDefaultTemplate',
        'jst',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'createDefaultTemplate',
        'jst',
        'useminPrepare',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'clean:server',
        'createDefaultTemplate',
        'jst',
        'connect:livereload',
        'open',
        'watch'
    ]);
};
