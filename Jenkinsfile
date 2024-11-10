pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.43.1' } }
    parameters {
        booleanParam(name: 'RUN_UNIT_TESTS', defaultValue: false, description: 'Run unit tests')
    }
   stages {
      stage('e2e-tests') {
         steps('Install Dependencies') {
            script{
                if(params.RUN_UNIT_TESTS){
                    sh 'npm ci'
                    sh 'npx playwright test -g "tespruebaa"'
                }
            }
         }
      }
   }
}