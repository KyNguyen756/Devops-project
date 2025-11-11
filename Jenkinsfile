pipeline {
    agent any
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Build & Deploy') {
            steps {
                sh '''
                docker compose down || true
                docker compose up -d --build
                docker image prune -f
                '''
            }
        }
    }
    post {
        success { echo 'Thành công! React: http://<IP>:3000 | API: http://<IP>:8080' }
        failure { echo 'Thất bại!' }
    }
}