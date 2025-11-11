pipeline {
    agent any
    options {
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                sh 'docker build -t backend-image ./Backend'
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                cd frontend
                docker build --memory=1g --memory-swap=1g -t frontend-image .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker compose down || true
                docker compose up -d
                '''
            }
        }
    }

    post {
        success { echo 'CI/CD THÀNH CÔNG!' }
        failure { echo 'CI/CD THẤT BẠI!' }
    }
}