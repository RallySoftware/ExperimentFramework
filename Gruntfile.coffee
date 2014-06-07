module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'grunt-groundskeeper'
  grunt.loadNpmTasks 'grunt-jasmine-node'

  grunt.registerTask 'deploy', ['clean:deploy','jshint','uglify']
  grunt.registerTask 'debug', ['clean:debug','jshint','uglify']
  grunt.registerTask 'default', ['debug','jasmine']
  grunt.registerTask 'default', ['jasmine_node']
  
  spec = grunt.option('spec') || '*'

  devFiles = [
    'bower_components/lodash/dist/lodash.compat.min.js'
    'bower_components/superagent/superagent.js'
    'src/**/*.js'
  ]

  grunt.initConfig
    clean:
      debug: [ 'gen/**/*' ]
      deploy:[ 'deploy**/*']
    watch:
      javasript:
        files: ['src/**/*.js','src/**/*.styl','test/**/*.*']
        tasks: ['default']
    jshint: ['gen/**/*.js', 'test/**/*.js']
    uglify:
      default:
        files:
          'deploy/all.js': devFiles
    jasmine:
      dev:
        src:  devFiles
        options:
            template: 'test/specs.tmpl'
            keepRunner: true
            specs: 'test/**/' + spec + 'Spec.js'
            helpers:[
              'bower_components/jquery/jquery.js'
              'bower_components/q/q.js'
              'bower_components/jasmine/lib/jasmine-core/jasmine.js'
              'bower_components/jasmine/lib/jasmine-core/jasmine-html.js'
              'bower_components/jasmine/lib/jasmine-core/boot/boot.js'
            ]
            outfile:'SpecRunner.html'
    jasmine_node:
      all: ['test/']


