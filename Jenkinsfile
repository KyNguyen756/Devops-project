pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Deploy') {
            steps {
                sh '''
                # Dừng container cũ
                docker-compose down || true
                
                # Build & chạy mới
                docker-compose up -d --build
                
                # Dọn dẹp
                docker image prune -f
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD THÀNH CÔNG!'
            echo 'React:  http://<THAY_IP>:3000'
            echo 'API:    http://<THAY_IP>:8080'
        }
        failure {
            echo 'CI/CD THẤT BẠI!'
        }
    }
}