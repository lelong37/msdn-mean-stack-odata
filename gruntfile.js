module.exports = function(grunt) {
    grunt.initConfig({
        concurrent: {
            dev: {
                tasks: ['nodemon', 'node-inspector', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    watchedExtensions: ['js'],
                    args: ['dev'],
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                        // opens browser on initial server start
                        //nodemon.on('config:update', function () {
                        //    // Delay before server listens on port 
                        //    setTimeout(function () {
                        //        require('open')('http://localhost:3000');
                        //    }, 1000);
                        //});
                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function () {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    },
                    env: {
                        PORT: '1337',
                        NODE_ENV: "development"
                    },

                    cwd: __dirname,
                    ignore: ['node_modules/**']
                }
            },
        },
        watch: {
            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            }
        }
    });
     
    //load nodemon as a plug-in for grunt
    grunt.loadNpmTasks('grunt-nodemon');
    //when grunt is run, the default thing to do is to run nodemon
    grunt.registerTask('default', ['nodemon']);
};