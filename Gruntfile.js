module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            js: {
                src: [
                    'src/js/gp.header.js',
                    'src/js/gp.object.js',
                    'src/js/gp.internals.js',
                    'src/js/gp.basic.js',
                    'src/js/gp.menu.js',
                    'src/js/gp.slideshow.js',
                    'src/js/gp.audioplayer.js',
                    'src/js/gp.randomaudio.js',
                    'src/js/gp.ready.js'
                ],
                dest: 'dist/gp.tools.js',
            },
            css: {
                src: [
                    'src/css/gp.header.css',
                    'src/css/gp.imports.css',
                    'src/css/gp.basic.css',
                    'src/css/gp.menu.css',
                    'src/css/gp.activebanner.css',
                    'src/css/gp.slideshow.css',
                    'src/css/gp.audioplayer.css'
                ],
                dest: 'dist/gp.tools.css',
            },
        },
        copy: {
            jquery: {
                expand: true,
                cwd: 'node_modules/jquery/dist/',
                src: ['**'],
                dest: 'dist/jquery/',
            },
            lightbox: {
                expand: true,
                cwd: 'node_modules/lightbox2/dist/',
                src: ['**'],
                dest: 'dist/lightbox/',
            },
            mediaelement: {
                expand: true,
                cwd: 'node_modules/mediaelement/build/',
                src: ['**'],
                dest: 'dist/mediaelement/',
            },
            images: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.png'],
                dest: 'dist/',
            },
        },
        uglify: {
            js: {
                src: ['dist/gp.tools.js'],
                dest: 'dist/gp.tools.min.js',
            },
        },
        cssmin: {
            options: {
                processImport: false
            },
            css: {
                src: ['dist/gp.tools.css'],
                dest: 'dist/gp.tools.min.css',
            },
        },
        clean: {
            dist: ['dist']
        },
        watch: {
            js: {
              files: ['src/js/*.js'],
              tasks: ['concat:js', 'uglify'],
            },
            css: {
              files: ['src/css/*.css'],
              tasks: ['concat:css', 'cssmin'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'copy', 'uglify', 'cssmin']);
    grunt.registerTask('rebuild', ['clean', 'default']);
};
