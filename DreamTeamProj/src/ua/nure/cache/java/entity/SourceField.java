package ua.nure.cache.java.entity;

public class SourceField {
		
		private String variable;
		
		private AddObj object;
		
		@Override
		public boolean equals(Object obj) {
			SourceField o = (SourceField) obj;
			if (o.getVariable().equals(this.getVariable())) {
				return true;
			}
			return false;
		}

		public String getVariable() {
			return variable;
		}

		public void setVariable(String variable) {
			this.variable = variable;
		}

		public AddObj getObject() {
			return object;
		}

		public void setObject(AddObj object) {
			this.object = object;
		}
		
}
