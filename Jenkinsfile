pipeline {
    agent any

    environment {
        // CẤU HÌNH HARBOR
        HARBOR_URL      = '35.172.100.124:8082'
        HARBOR_PROJECT  = 'devops'
        HARBOR_USER     = 'kynguyen'
        HARBOR_PASS     = 'Ky75695423'
        IMAGE_TAG       = "${env.BUILD_NUMBER}"

        // IP EC2
        EC2_IP          = '35.172.100.124'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push to Harbor') {
            steps {
                sh '''
                # Login vào Harbor
                echo "$HARBOR_PASS" | docker login $HARBOR_URL -u $HARBOR_USER --password-stdin

                # Build + Tag image
                docker build -t $HARBOR_URL/$HARBOR_PROJECT/frontend:$IMAGE_TAG ./frontend
                docker build -t $HARBOR_URL/$HARBOR_PROJECT/backend:$IMAGE_TAG ./Backend

                # Push vào Harbor
                docker push $HARBOR_URL/$HARBOR_PROJECT/frontend:$IMAGE_TAG
                docker push $HARBOR_URL/$HARBOR_PROJECT/backend:$IMAGE_TAG

                # Dọn dẹp
                docker image prune -f
                '''
            }
        }

        stage('Deploy from Harbor') {
            steps {
                sh '''
                # Dừng container cũ
                docker compose down || true

                # Pull image mới nhất từ Harbor
                docker compose pull || true

                # Khởi động
                docker compose up -d
                '''
            }
        }
    }

    post {
        success {
            echo "THÀNH CÔNG! CI/CD HOÀN CHỈNH!"
            echo "React Frontend: http://$EC2_IP:3000"
            echo "Spring Boot API: http://$EC2_IP:8080"
            echo "Jenkins: http://$EC2_IP:8081"
            echo "Harbor Registry: http://$EC2_IP:8082"
        }
        failure {
            echo "THẤT BẠI! Kiểm tra log Jenkins."
        }
    }
}