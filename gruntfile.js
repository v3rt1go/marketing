module.exports = function (grunt) {
  'use strict';

  // Callback used to output info from scripts in shell
  var logger = function log(err, stdout, stderr, cb) {
    if (err) console.error(err);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);

    cb();
  };

  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },
      debug: {
        tasks: ['nodemon:debug', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true,
        debounceDelay: 250
      },
      client: {
        files: ['client/**/*.js', 'client/**/*.css', 'client/**/*.html',
                'public/**/*.js', 'public/**/*.css', 'public/**/*.html'],
        tasks: ['eslint:client']
      },
      server: {
        files: ['server/**/*.js', 'index.js', 'gruntfile.js'],
        tasks: ['eslint:server'],
        options: {
          reload: true
        }
      }
    },
    eslint: {
      client: {
        src: ['client/**/*.js', 'public/**/*.js'],
        options: {
          configFile: 'config/eslint/client.json'
        }
      },
      server: {
        src: ['server/**/*.js', 'index.js', 'gruntfile.js'],
        options: {
          configFile: 'config/eslint/server.json'
        }
      }
    },
    nodemon: {
      options: {
        callback: function (nodemon) {
          nodemon.on('log', function (event) {
            console.log(event.colour);
          });
        },
        cwd: __dirname,
        ignore: ['node_modules/**'],
        ext: 'js,coffee',
        watch: ['server/**/*.js', 'index.js', 'gruntfile.js'],
        delay: 1000,
        legacyWatch: true
      },
      dev: {
        script: 'index.js'
      },
      debug: {
        script: 'index.js',
        options: {
          args: ['debug'],
          nodeArgs: ['--debug']
        }
      }
    },
    shell: {
      setup: {
        command: "ssh -p15121 agriciuc@node1.webwire.ro < scripts/app_setup.sh",
        options: {
          callback: logger
        }
      },
      deploy: {
        command: function (commitMsg) {
          var gitAdd = 'git add .';
          var gitCommit = 'git commit -am \''+commitMsg+'\'';
          var gitDeploy = 'git push deploy master';

          return [gitAdd, gitCommit, gitDeploy].join('&&');
        },
        options: {
          callback: logger
        }
      }
    }
  });

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['eslint', 'concurrent:dev']);
  grunt.registerTask('start:dev', ['eslint', 'concurrent:dev']);
  grunt.registerTask('start:debug', ['eslint', 'concurrent:debug']);
  grunt.registerTask('production:setup', ['shell:setup']);
  grunt.registerTask('production:deploy', function(commitMsg) {
    grunt.task.run('shell:deploy:' + commitMsg);
  });

};
