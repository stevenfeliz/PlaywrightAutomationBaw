pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.43.1-noble' } }
   parameters {
        booleanParam(name: 'RUN_UNIT_TESTS', defaultValue: false, description: 'Run unit tests')
    }
   stages {
      stage('e2e-tests') {
         when {
                expression { return params.RUN_UNIT_TESTS }
            }
         steps {
            sh 'npm ci'
            sh 'npx playwright test -g "tespruebaa"'
         }
      }
   }
}
