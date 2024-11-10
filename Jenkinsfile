pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.43.1' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm ci'
            sh 'npx playwright test -g "tespruebaa"'
         }
      }
   }
}
