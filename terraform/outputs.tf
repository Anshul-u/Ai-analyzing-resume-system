output "ec2_public_ip" {
  value       = aws_instance.app_server.public_ip
  description = "Public IP address of deployed EC2 server"
}

output "s3_bucket_arn" {
  value       = aws_s3_bucket.resume_bucket.arn
  description = "ARN of private document S3 bucket"
}
