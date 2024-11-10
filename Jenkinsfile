pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.43.1' } }

    parameters {
        booleanParam(name: 'RUN_UNIT_TESTS', defaultValue: false, description: 'Run unit tests')
        booleanParam(name: 'FIN', defaultValue: false, description: 'FIN')
    }

    stages {
        stage('Install Java') {
            steps {
                script {
                    // Instalar Java con permisos de superusuario si es posible
                    sh 'sudo apt-get update && sudo apt-get install -y openjdk-17-jdk'
                    // Establecer JAVA_HOME
                    sh 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64'
                    sh 'export PATH=$JAVA_HOME/bin:$PATH'
                }
            }
        }

        stage('e2e-tests') {
            steps {
                script {
                    if (params.RUN_UNIT_TESTS) {
                        sh 'npm ci'
                        sh 'npx playwright test -g "tespruebaa"'
                    }
                }
            }
        }

        stage('fin') {
            steps {
                script {
                    if (params.FIN) {
                        echo "JAVA_HOME: ${env.JAVA_HOME}"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Configuración de Allure
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'build/allure-results']]
                ])
            }
        }
    }
}
