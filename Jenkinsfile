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
}
