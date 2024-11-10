pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.43.1' } }
    parameters {
        booleanParam(name: 'RUN_UNIT_TESTS', defaultValue: false, description: 'Run unit tests')
        booleanParam(name: 'FIN', defaultValue: false, description: 'FIN')

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

      stage('fin'){
            steps('FIN') {
            script{
                if(params.FIN){
                    echo 'FIN!'
                }
            }
         }
      }

      post{
          always {
            echo 'This will always run'
        }
      }
   }
}