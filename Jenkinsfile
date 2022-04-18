def load_conf(branch) {
    echo "Branch ${branch}."
    def project_name = ""
    def stage = ""
    def aws_default_region = ""

    switch(branch) {
        case 'develop':
            def file = readJSON(file: './conf/dev_conf.json')
            project_name = file["PROJECT_NAME"]
            stage = file["STAGE"]
            aws_default_region = file["AWS_DEFAULT_REGION"]
        case 'master':
            def file = readJSON(file: './conf/prod_conf.json')
            project_name = file["PROJECT_NAME"]
            stage = file["STAGE"]
            aws_default_region = file["AWS_DEFAULT_REGION"]
        default:
            def file = readJSON(file: './conf/test_conf.json')
            project_name = file["PROJECT_NAME"]
            stage = file["STAGE"]
            stage += '-' + env.BRANCH_NAME.split('-')[0].split('/')[1]
            aws_default_region = file["AWS_DEFAULT_REGION"]
    }

    env.BUCKET_NAME = "front-" + project_name + "-" + stage
    env.PROJECT_NAME = project_name
    env.STAGE = stage
    env.AWS_DEFAULT_REGION = aws_default_region
}

def create_env_file() {
    def apigw_id = sh(
        script: "aws apigateway get-rest-apis --region=\"$env.AWS_DEFAULT_REGION\" --output text --query 'items[?name==`APIGW-$env.PROJECT_NAME-$env.STAGE`].id'",
        returnStdout: true
    ).trim()

    sh "echo REACT_APP_APIGW_ID=$apigw_id > .env.$env.STAGE"
    sh "echo REACT_APP_AWS_DEFAULT_REGION=$env.AWS_DEFAULT_REGION >> .env.$env.STAGE"
    sh "echo REACT_APP_STAGE=$env.STAGE >> .env.$env.STAGE"

    sh "cat .env.$env.STAGE"
}


pipeline {
    agent any

    tools {nodejs "nodejs"}

    environment {
        // To run npm tests in non interactive mode
        CI = true
        BRANCH_ENV = "${env.BRANCH_NAME == 'develop' ? 'develop' : env.BRANCH_NAME == 'master' ? 'production' : 'none'}"
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
                    echo "test"
                    echo env.BRANCH_ENV

                    // Basically, you should not need to deploy front on a test env
                    // But in case you really need, add DEPLOY at the end of the commit message
                    if (git_commit_message.endsWith("DEPLOY") && BRANCH_ENV == 'none') {
                        echo "This build is deploying..."
                        deploy = true
                    }
                }
            }
        }
        stage('Load Conf') {
            steps {
                load_conf(env.BRANCH_NAME)
            }
        }
        stage('Init') {
            steps {
                sh "pip3 install --upgrade awscli --user"
                sh "npm cache clean --force"
                sh "npm install"
            }
        }
        stage('Create Env File') {
            steps {
                create_env_file()
            }
        }
        stage('Unit Tests') {
            steps {
                sh "npm run test"
            }
        }
        stage('Before Deploy') {
            when {
                expression {
                    deploy == true
                }
            }
            steps {
                echo ""
            }
        }
        stage('Build App') {
            when {
                expression {
                    deploy == true
                }
            }
            steps {
                sh "npm run build"
            }
        }
        stage('Deploy') {
            when {
                expression {
                    deploy == true
                }
            }
            steps {
                sh "aws s3 cp build s3://$env.BUCKET_NAME/ --recursive"
            }
        }
        stage('After Deploy') {
            when {
                expression {
                    deploy == true
                }
            }
            steps {
                echo ""
            }
        }
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
    }
}