def load_conf(branch) {
    echo "Branch ${branch}."
    def project_name = ""
    def stage = ""
    env.BUCKET_NAME = "front-"

    switch(branch) {
        case 'develop':
            project_name = readJSON(file: './conf/dev_conf.json')["PROJECT_NAME"]
            stage = readJSON(file: './conf/dev_conf.json')["STAGE"]
        case 'master':
            project_name = readJSON(file: './conf/dev_conf.json')["PROJECT_NAME"]
            stage = readJSON(file: './conf/dev_conf.json')["STAGE"]
        default:
            project_name = readJSON(file: './conf/dev_conf.json')["PROJECT_NAME"]
            stage = readJSON(file: './conf/dev_conf.json')["STAGE"]
            stage += '-' + env.BRANCH_NAME.split('-')[0].split('/')[1]
    }

    env.BUCKET_NAME = env.BUCKET_NAME + project_name + "-" + stage
}

pipeline {
    agent any

    tools {nodejs: 'nodejs'}

    environment {
        // To run npm tests in non interactive mode
        env.CI = true
        BRANCH_ENV = "{env.BRANCH_NAME == 'develop' ? 'develop' : env.BRANCH_NAME == 'master' ? 'production' : 'none'}"
    }

    stages {
        stage('Check Deploy') {
            steps {
                script {
                    deploy = true
                    git_commit_message = sh(returnStdout: true, script: 'git show -s --format=%B -1').trim()
                    echo ("Commit: ${git_commit_message}")

                    if ((git_commit_message.endsWith("NODEPLOY") && BRANCH_ENV == 'none') || BRANCH_ENV == 'none') {
                        echo "This build will not be deployed."
                        deploy = false
                    }

                    // Basically, you should not need to deploy front on a test env
                    // But in case you really need, add DEPLOY at the end of the commit message
                    if (git_commit_message.endsWith("DEPLOY") && BRANCH_ENV == 'none') {
                        echo "This build is deploying..."
                        deploy = true
                    }
                }
            }
        }
        stage('Init') {
            steps {
                sh "make init"
            }
        }
        stage('Before Deploy') {
            steps {
                sh "make beforedeploy"
            }
        }
        stage('Unit Tests') {
            steps {
                sh "make unittests"
            }
        }
        stage('Build App') {
            when {
                expression {
                    deploy == true
                }
            }
            steps {
                sh "make buildapp"
            }
        }
        stage('Deploy') {
            when {
                expression {
                    deploy == true
                }
            }
            steps {
                sh "make deploy"
            }
        }
        stage('After Deploy') {
            when {
                expression {
                    deploy == true
                }
            }
            steps {
                sh "make afterdeploy"
            }
        }
        stage('Clear Workspace') {
            steps {
                sh "make clearworkspace"
            }
        }
    }
}