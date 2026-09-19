variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS deployment region"
}

variable "environment" {
  type        = string
  default     = "production"
  description = "Deployment environment stage"
}

variable "s3_bucket_name" {
  type        = string
  default     = "ai-resume-analyzer-documents-bucket"
  description = "Name of private S3 bucket for resume storage"
}

variable "instance_type" {
  type        = string
  default     = "t3.micro"
  description = "AWS EC2 instance type"
}
