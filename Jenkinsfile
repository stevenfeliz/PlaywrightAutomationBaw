pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.43.1'; args '--user root' } }

    environment {
        HISTORY_DIR = 'allure-history'
    }
    parameters {
        booleanParam(name: 'RUN_UNIT_TESTS', defaultValue: false, description: 'Run unit tests')
        booleanParam(name: 'FIN', defaultValue: false, description: 'FIN')
    }

    stages {
        stage('Install Java') {
            steps {
                script {
                    // Instalar Java en el contenedor de Playwright
                    sh 'apt-get update && apt-get install -y openjdk-17-jdk'
                    // Establecer JAVA_HOME en el contenedor
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
                        sh 'npx playwright test -g "valida prueba mmg"'
                    }
                }
            }
        }
    
        stage('Add History to Allure Results') {
            steps {
                script {
                    // Copia la carpeta history a allure-results si existe
                    if (fileExists("${HISTORY_DIR}/history")) {
                        sh 'mkdir -p allure-results/history'
                        sh "cp -r ${HISTORY_DIR}/history allure-results/"
                    }
                }
            }
        }
        stage('Generate Allure Report') {
            steps {
                // Genera el reporte de Allure
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }
        stage('Generate Allure Report single file') {
            steps {
                // Genera el reporte de Allure
                sh 'npx allure generate --single-file allure-results --clean -o allure-singlefile'
            }
        }

        stage('Save Allure History') {
            steps {
                script {
                    // Guarda la carpeta history para la próxima ejecución
                    sh "mkdir -p ${HISTORY_DIR}"
                    sh "cp -r allure-report/history ${HISTORY_DIR}/"
                }
            }
        }
    }
    post{
        always{
            allure includeProperties:
            false,
            jdk: '',
            results: [[path: 'build/allure-results']]
        }
    }
}
